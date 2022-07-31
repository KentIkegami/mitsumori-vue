export default function (){
  const log = (texts: any[]): void => {
    let t = ' ';
    texts.forEach((text) => {
        t += text + ':';
    });
    if (t.slice(-1) === ':'){
      t = t.slice(0, -1);
    }
    console.log('[debug]' + t);
  };
  const checkJson = (data: string): void => {
    log(['checkJson', 'start'])
    let json;
  
    // jsonとして書式があっているかチェック
    try {
      json = JSON.parse(JSON.stringify(data));
    } catch (error) {
      log(['checkJson', 'error', error])
      throw 1;
    }
  
    // 'number' 'string' 'boolean' 'undefined' 'object' 'Array.isArray'
    const existAndTypeCheck = (json: any, key: string, type: string, required: boolean, memo: any): string => {
      // 必須なのに存在しない
      if (required && !(key in json)) {
        log(['checkJson', 'existAndTypeCheck', key, 'がありません。', memo])
        throw 1;
      }
      // 存在しない
      if (!(key in json)) {
        return 'not_exist';
      }
      // 配列かチェック
      if (type === 'array'){
        if (!Array.isArray(json[key])){
          log(['checkJson','existAndTypeCheck', 'key', key, '値', json[key] , '想定している型', type, memo]);
          throw 1;
        }
      }else{
        // 型チェック
        if (typeof json[key] !== type){
          log(['checkJson','existAndTypeCheck', 'key', key, '値', json[key] , '想定している型', type, '実際の型', typeof json[key], memo]); 
          throw 1;
        }
        if(type === 'number'){
          // 0以上かチェック
          if (json[key] < 0){
            log(['checkJson','existAndTypeCheck', 'key', key, '値', json[key] , '0以上の数を設定してください。', memo]); 
            throw 1;
          }
        }
      }
      return 'exist';
    }
  
    existAndTypeCheck(json, 'version', 'string', false, '');
    existAndTypeCheck(json, 'title', 'string', false, '');
    existAndTypeCheck(json, 'description', 'string', false, '');
    existAndTypeCheck(json, 'terms_html', 'string', false, '');
    existAndTypeCheck(json, 'categories', 'array', true, '');
  
    json.categories.forEach((category: any) => {
      existAndTypeCheck(category, 'name', 'string', true, '');
      existAndTypeCheck(category, 'description', 'string', true, 'category.name:'+category.name);
      const existPropagationGroups = existAndTypeCheck(category, 'propagation_groups', 'array', false, 'category.name:'+category.name);
      const existProcesses = existAndTypeCheck(category, 'processes', 'array', true, 'category.name:'+category.name);
      const extraComputeds = existAndTypeCheck(category, 'extra_computeds', 'array', false , 'category.name:'+category.name);
      
      const item_ids: string[] = [];
      if (existProcesses === 'exist'){
        category.processes.forEach((processe: any) => {
          existAndTypeCheck(processe, 'name', 'string', true, '');
          existAndTypeCheck(processe, 'base', 'boolean', false, 'processe.name'+processe.name);
          existAndTypeCheck(processe, 'items', 'array', true, 'processe.name'+processe.name);
          processe.items.forEach((item: any) => {
            existAndTypeCheck(item, 'item_id', 'string', true, '');
            item_ids.push(item.item_id)
            existAndTypeCheck(item, 'name', 'string', true, 'item.id:'+item.item_id);
            existAndTypeCheck(item, 'is_disabled', 'boolean', true, 'item.id:'+item.item_id);
            existAndTypeCheck(item, 'is_required', 'boolean', true, 'item.id:'+item.item_id);
            existAndTypeCheck(item, 'description', 'string', true, 'item.id:'+item.item_id);
            existAndTypeCheck(item, 'type', 'string', true, 'item.id:'+item.item_id);
            existAndTypeCheck(item, 'quantity', 'number', true, 'item.id:'+item.item_id);
            existAndTypeCheck(item, 'cost', 'number', true, 'item.id:'+item.item_id);
            existAndTypeCheck(item, 'detail_static', 'object', false, 'item.id:'+item.item_id);
            existAndTypeCheck(item, 'detail_dynamic', 'object', false, 'item.id:'+item.item_id);
            existAndTypeCheck(item, 'detail_dependence', 'object', false, 'item.id:'+item.item_id);
            if(!['static', 'dynamic', 'dependence'].includes(item.type)){
              log(['checkJson', '存在しないitem.typeです', 'item.id:'+item.item_id]);
              throw 1;
            }
            if ((item.type === 'static')&&!('detail_static' in item)){
              log(['checkJson', 'detail_staticが必要です。', 'item.id:'+item.item_id]);
              throw 1;
            }
            if ((item.type === 'dynamic')&&!('detail_dynamic' in item)){
              log(['checkJson', 'detail_dynamicが必要です。', 'item.id:'+item.item_id]);
              throw 1;
            }
            if ((item.type === 'dependence')&&!('detail_dependence' in item)){
              log(['checkJson', 'detail_dependenceが必要です。', 'item.id:'+item.item_id]);
              throw 1;
            }
            if ('detail_static' in item){
              existAndTypeCheck(item.detail_static, 'unit_cost', 'number', true, 'item.id:'+item.item_id);
            }
            if ('detail_dynamic' in item){
              existAndTypeCheck(item.detail_dynamic, 'unit_name', 'string', true, 'item.id:'+item.item_id);
              existAndTypeCheck(item.detail_dynamic, 'unit_mass', 'number', true, 'item.id:'+item.item_id);
              existAndTypeCheck(item.detail_dynamic, 'unit_description', 'string', false, 'item.id:'+item.item_id);
              existAndTypeCheck(item.detail_dynamic, 'unit_cost', 'number', true, 'item.id:'+item.item_id);
              existAndTypeCheck(item.detail_dynamic, 'min_quantity', 'number', true, 'item.id:'+item.item_id);
              existAndTypeCheck(item.detail_dynamic, 'max_quantity', 'number', true, 'item.id:'+item.item_id);
              if (item.detail_dynamic.min_quantity > item.detail_dynamic.max_quantity ){
                log(['checkJson', 'min_quantityはmax_quantityより小さくしてください。', 'item.id:'+item.item_id]);
                throw 1;
              }
            }
            if ('detail_dependence' in item){
              existAndTypeCheck(item.detail_dependence, 'coefficient', 'number', true, 'item.id:'+item.item_id);
            }
          })
        })
      }
      const setItem_ids = Array.from(new Set(item_ids));
      if (item_ids.length !== setItem_ids.length){
        let new_arr = item_ids.filter(function(val, i, array){
          return !(array.indexOf(val) === i);
        });
        log(['checkJson', 'item.item_idの重複があります。', new_arr]);
        throw 1;
      }
      if (existPropagationGroups === 'exist'){
        category.propagation_groups.forEach((propagation_group: any) => {
          existAndTypeCheck(propagation_group, 'description', 'string', false, 'category.name:'+category.name+'のpropagation_group');
          existAndTypeCheck(propagation_group, 'propagations', 'array', true, 'category.name:'+category.name+'のpropagation_group');
          propagation_group.propagations.forEach((propagation: any) => {
            existAndTypeCheck(propagation, 'from_id', 'string', true, '');
            existAndTypeCheck(propagation, 'to_id', 'string', true, '');
            existAndTypeCheck(propagation, 'type', 'string', true, '');
            if(!['ZERO_TO_ZERO', 'ONE_TO_ONE', 'N_TO_N', 'ZERO_TO_DISABLE', 'ZERO_TO_ABLE', 'ONE_TO_DISABLE', 'ONE_TO_ABLE' ].includes(propagation.type)){
              log(['checkJson', '存在しないpropagation.typeです', propagation.type])
              throw 1;
            }
            if(propagation.from_id === propagation.to_id){
              log(['checkJson', 'propagation.from_idとto_idは違う必要があります。', propagation.from_id])
              throw 1;
            }
            if(!item_ids.includes(propagation.from_id)){
              log(['checkJson', 'このfrom_idは、このカテゴリー上に存在しないitem_idです', propagation.from_id])
              throw 1;
            }
            if(!item_ids.includes(propagation.to_id)){
              log(['checkJson', 'このto_idは、このカテゴリー上に存在しないitem_idです', propagation.to_id])
              throw 1;
            }
          })
        })
      }
      if (extraComputeds === 'exist'){
        category.extra_computeds.forEach((extra_computed: any) => {
          existAndTypeCheck(extra_computed, 'description', 'string', false, 'category.name:'+category.name);
          existAndTypeCheck(extra_computed, 'calc_result', 'string', true, 'category.name:'+category.name);
          existAndTypeCheck(extra_computed, 'is_show', 'boolean', true, 'category.name:'+category.name);
          existAndTypeCheck(extra_computed, 'trigger_item_ids', 'array', true, 'category.name:'+category.name);
          extra_computed.trigger_item_ids.forEach((trigger_item_id: string) => {
            if(!item_ids.includes(trigger_item_id)){
              log(['checkJson', 'このtrigger_item_idは、このカテゴリー上に存在しないitem_idです', trigger_item_id])
              throw 1;
            }
          })
          existAndTypeCheck(extra_computed, 'var_items', 'array', true, 'category.name:'+category.name);
          extra_computed.var_items.forEach((var_item: any) => {
            existAndTypeCheck(var_item, 'var_name', 'string', true, 'category.name:'+category.name);
            existAndTypeCheck(var_item, 'item_id', 'string', true, 'category.name:'+category.name);
            existAndTypeCheck(var_item, 'property', 'string', true, 'category.name:'+category.name);
            if(!item_ids.includes(var_item.item_id)){
              log(['checkJson', 'このvar_item.item_idは、このカテゴリー上に存在しないitem_idです', var_item.item_id])
              throw 1;
            }
          })
          existAndTypeCheck(extra_computed, 'calc_logic', 'string', true, 'category.name:'+category.name);
          existAndTypeCheck(extra_computed, 'show_logic', 'string', true, 'category.name:'+category.name);
        })

      }
    });
    log(['checkJson', 'end'])
  };
  return {
    checkJson
  }
}