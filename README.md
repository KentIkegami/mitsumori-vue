# mitsumori-vue

さまざまな見積もりを算出するためのインターフェースコンポーネントです。
mitsumori-vueコンポーネントは、propsのurlで設定したパスからjson形式のデータを読み込み、画面を構成しています。
propsの設定値については[こちら](#props)を参照してください。


- [mitsumori-vue](#mitsumori-vue)
  - [Dependency](#dependency)
  - [導入(npm)](#導入npm)
  - [導入(CDN)](#導入cdn)
  - [デモ](#デモ)
  - [jsonの入力例](#jsonの入力例)
  - [HTMLをJSONに埋め込める形に変換](#htmlをjsonに埋め込める形に変換)
  - [Props](#props)
    - [propsの項目](#propsの項目)
    - [設定例](#設定例)
  - [考え方](#考え方)
    - [カテゴリー Categories](#カテゴリー-categories)
    - [プロセス Processes](#プロセス-processes)
    - [アイテム items](#アイテム-items)
  - [json仕様](#json仕様)
    - [Root](#root)
    - [Category](#category)
    - [Process](#process)
    - [Item](#item)
    - [Propagation](#propagation)
    - [ExtraLogic](#extralogic)


## Dependency

Vue3(3.2+)


## 導入(npm)


```sh
npm i mitsumori-vue
```

['main.js']
```js
import { createApp } from 'vue'
import { MitsumoriVue } from 'mitsumori-vue'
import '../node_modules/mitsumori-vue/dist/style.css'

const SETTINGS = {
  url: "../node_modules/mitsumori-vue/dist/example.json"
}
createApp(MitsumoriVue, SETTINGS).mount('#mitsumori-vue-app')

```

[index.html]
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>mitsumori-vue</title>
  </head>
  <body>
    <div id="mitsumori-vue-app"></div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

## 導入(CDN)

```html
<!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="https://unpkg.com/mitsumori-vue@0.2.1/dist/style.css">
    <title>mitsumori-vue-app</title>
  </head>
  <body>
    <div id="mitsumori-vue-app"></div>
  </body>
  <script async src="https://unpkg.com/es-module-shims@1.3.6/dist/es-module-shims.js"></script>
  <script type="importmap">
    {
      "imports": {
        "vue": "https://unpkg.com/vue@next/dist/vue.esm-browser.js",
        "mitsumori-vue": "https://unpkg.com/mitsumori-vue@0.2.1/dist/mitsumori-vue.es.js"
      }
    }
  </script>
  <script type="module">
  import { createApp } from 'vue';
  import { MitsumoriVue } from 'mitsumori-vue';
  
  const SETTINGS = {
    url: "https://unpkg.com/mitsumori-vue@0.2.1/dist/example.json"
  }
  
  createApp(MitsumoriVue, SETTINGS).mount('#mitsumori-vue-app')

  </script>
</html>
```



## デモ

[https://kentikegami.github.io/mitsumori-vue/](https://kentikegami.github.io/mitsumori-vue/)



## jsonの入力例

[https://unpkg.com/mitsumori-vue@0.2.1/dist/example.json](https://unpkg.com/mitsumori-vue@0.2.1/dist/example.json)



## HTMLをJSONに埋め込める形に変換

一部のjson項目はhtml表示に対応している。
[こちら](http://html-json-escape-vue.s3-website-ap-northeast-1.amazonaws.com/)でHTMLのエスケープ処理を行ってください。





## Props

### propsの項目

|Key|Description|Required|Type|Default|
|-----|-----------|--------|----|-------|
|url| jsonデータの取得先 |false|String| './example.json'|
|initCategoryIndex| カテゴリーの初期選択のインデックス番号 |false|Number?| null |
|initProcessIndex| プロセスの初期選択のインデックス番号 |false|Number?| null |
|debug| trueでデバッグログをコンソールに吐き出します。 |false|Boolean| false |
|useCheckJson| trueで読み込むjsonの書式チェックを行います。 |false|Boolean| false |
|useLoading| ページ読み込み時にローディングを表示します。 |false|Boolean| true |
|useTerms| 利用規約を表示します。 |false|Boolean| true |
|useTermsConfirmationCheck| 利用規約を許諾するかのチェックボックスを表示します。 |false|Boolean| true |
|useEmailEstimate| メールによる見積もりの問い合わせボタンを表示します。 |false|Boolean| true |
|usePdfEstimate| PDFの見積書をプレビューするためのボタンを表示します。 |false|Boolean| true |
|usePdfEstimateMetaField| PDFの見積書に載せる、御中・自社名・自社住所の設定を行うためのフィールドを表示します。 |false|Boolean| true |
|categorySelectTitle| カテゴリー選択の上部に表示する文字列の設定 |false|String| '見積もりの種類' |
|ownerCompanyName| PDFに載せる自社名 |false|String| '〇〇コーポレーション' |
|ownerCompanyAddress| PDFに載せる自社住所 |false|String| '東京都 中央区 1-1-1' |
|ownerEmail| メールによる見積もりの送信先アドレス |false|String| 'info@example.com' |
|prosessColors| プロセス選択ボタンの色設定 |false|[String]| ※ |
|partsColor| パーツの色設定 パーツはチェックボックス・レンジ・ボタン |false|String| '#2e80ff' |
|itemBackColor| アイテムの背景色設定 |false|String| '#d9e9ff' |

※['#5f91a6','#8CBFBF','#84B5A7','#B899F2','#A79FFC''#9DAAE6','#9FC9FC','#99D8F2']



### 設定例

```js

const SETTINGS = {
  url: 'https://unpkg.com/mitsumori-vue@0.2.1/dist/example.json',
  initCategoryIndex: 0,
  initProcessIndex: 0,
  debug: false,
  useCheckJson: false,
  useLoading: true,
  useTerms: true,
  useTermsConfirmationCheck: true,
  useEmailEstimate: true,
  usePdfEstimate: true,
  usePdfEstimateMetaField: true,
  categorySelectTitle: '見積もりの種類',
  ownerCompanyName: '株式会社〇〇',
  ownerCompanyAddress: '東京都丸々市1-1-1',
  ownerEmail: 'mitsumori@example.com',
  prosessColors: [
    '#fe7d7d',
    '#fd9f68',
    '#fdb64f',
    '#ffc037',
    '#ffd137',
    '#ffe237',
    '#fff11e',
    '#fbff38',
    '#eaff38',
    '#d9ff38'
  ],
  partsColor: '#FFC338',
  itemBackColor: '#FFFFC2'
}


```

## 考え方

見積もりを以下の3つの段階に落とし込んで考ます。

### カテゴリー Categories

同時に検討されることない、各々が独立した算出ロジックを持つ、サービスの種別になります。

例えば、家を建てる業者を考えた場合、`一軒家新築` / `屋根・壁修理` / `ガレージ新築` といったカテゴリーになります。

コーディング会社の場合、`ホームページ制作` / `業務システム開発` / `LP制作` といったカテゴリーになります。


### プロセス Processes

カテゴリーの中の工程を指します。これらは、見積もりをする人が見積もりしやすい単位で設定すると良いです。

ホームページ制作の場合、`デザイン` / `開発` / `要件定義` / `テスト` /　`アフターフォロー` というプロセスになります。

プロセスは発注後の業務フローに沿って設定してもいいし、見積もりをする時に頭の上で積み上げる順番にしてもよいです。

ホームページ制作の場合、業務フローだとまず`要件定義`から行いますが、見積もりのフェーズでは`デザイン`や`開発`といった項目から決めていくので、それらを前にしてもかまいません。


### アイテム items

これ以上分解できない、最小のサービスの単位です。

`基本料金`や`出張費`、`外壁塗装`、`パソコン初期セットアップ対応`、`家具設置` 、`レンタル衣装料`、`落とし穴設置`、 `魔王討伐代行` といった項目が考えられます。

細かいことを指摘すると、`魔王討伐代行` のサービスは、剣でトドメを刺すとか回復薬を使わないで倒すとか、いくつかの(素人にはわからない)オプションの差異があります。

これらの差異で料金が変わるなら、アイテムを分けた方がいいし、指定されたくない場合は分けない方がいいでしょう。


## json仕様

```json

{
  "version": "String",
  "title": "String",
  "description": "String(html)",
  "terms_html": "String(html)",
  "categories": 
  [
    {
      "name": "String",
      "description": "String",
      "extra_logic":
      {

      },
      "propagation_groups":
      [
        {
          "description": "String",
          "propagations": 
          [
            {
              "from_id": "String",
              "to_id": "String",
              "type": "String"
            }
          ]
        }
      ],
      "processes":
      [
        {
          "name": "String",
          "base": "Boolean",
          "items":
          [
            {
              "item_id": "String",
              "name": "String",
              "is_disabled": "Boolean",
              "is_required": "Boolean",
              "description": "String",
              "type": "String(static/dynamic/dependence)",
              "quantity": "Number",
              "cost": "Number",
              "detail_static": 
              {
                "unit_cost": "Number", 
              },
              "detail_dynamic": 
              {
                "unit_name": "String",
                "unit_mass": "Number",
                "unit_description": "String",
                "unit_cost": "Number", 
                "min_quantity": "Number",
                "max_quantity": "Number",
                "coefficient": "Number"
              },
              "detail_dependence": 
              {
                "coefficient": "Number"
              },
            },
          ]
        }
      ]
    } 
  ]
}

```

### Root

```json

{
  "version": "0.0.0",
  "title": "見積もりサービスのタイトルを設定します。",
  "description": "〇〇の各サービスのいろいろな見積もりを手軽に算出できます! <br> 登録不要で無料でお使いいただけます。ここはHTML入力可能です。",
  "terms_html": "プライバシーポリシーや利用規約を設定します。   <p class=\"h4\">利用規約< ...",
  "categories":[]
}
```

|Key|Description|Required|Type|Use html|
|-----|-----------|--------|-------|:-:|
|version| jsonのバージョン管理に使ってください。画面に表示しません。 |false|String| |
|title|画面上部のタイトルを設定|false|String|  |
|description|画面上部の説明文を設定|false|String|○|
|terms_html|利用規約のHTMLを設定|false|String|○|
|categories| カテゴリーの配列 |true|[Category]| |



### Category

Category配列の順番が、画面表示時の順番になります。

```json
{
  "categories":
  [
    {
      "name": "パソコンサポート",
      "description": "",
      "propagation_groups":[],
      "processes": [],
      "extra_logic": {}
    }
  ]
}
```

|Key|Description|Required|Type|Use html|
|-----|-----------|--------|----|:-:|
|name| カテゴリーの表示名 |true|String| |
|description| カテゴリーの端的な説明　※表示していません。 |false|String| |
|propagation_groups| 伝播グループの配列 |false|[PropagationGroup]| |
|processes| プロセスの配列 |true|[Process]| |
|extra_logic| 追加ロジック |false|| |


### Process

Process配列の順番が、画面表示時の順番になります。

```json

{
  "categories":
  [
    {
      "processes": 
      [
        {
          "name": "サポートメニュー",
          "base": true,
          "items":[]
        }
      ]
    }
  ]
}
```

|Key|Description|Required|Type|Use html|
|-----|-----------|--------|----|:-:|
|name| プロセスの表示名 |true|String| |
|base| 後述する、item.type: "dependence" の時にベースとなるプロセスにtrueを設定します。|false|Boolean| |
|items| アイテムの配列 |true|[Item]| |



### Item

Item配列の順番が、画面表示時の順番になります。


```json

{
  "categories":
  [
    {
      "processes": 
      [
        {
          "items":
          [
            {
              "item_id": "7e249a24-ebc7-4f87-b1c5-d77bd37e430c",
              "name": "簡易サーバー構築セット",
              "is_disabled": false,
              "is_required": false,
              "description": "セット内容: レンタルサーバの設定、ドメイン・DNSの設定、ホームページ・Webサイトのデプロイ、一時的なアクセス制限、無料SSL(https)設定",
              "type": "static",
              "quantity": 0,
              "cost": 0,
              "detail_static": 
              {
                "unit_cost": 15000
              },
               "detail_dynamic": 
              {
                "unit_name": "回",
                "unit_mass": 1,
                "unit_description": "(例: 色変更、フォント変更、画像差し替えなどをまとめて承り、１回とカウントします。)",
                "unit_cost": 20000, 
                "min_quantity": 0,
                "max_quantity": 10
              },
              "detail_dependence": 
              { 
                "coefficient": 0.12
              }
            }
          ]
        }
      ]
    }
  ]
}
```

|Key|Description|Required|Type|Use html|
|-----|-----------|--------|----|:-:|
|item_id| itemのID。UUID形式である必要はないですが、ユニークである必要はあります。 |true|String| |
|name| 項目名 |true|String| |
|is_disabled| 初期状態で編集不可かどうかを設定します。ユーザーの操作で変動する項目。 |true|Boolean| |
|is_required| 必須項目設定　赤字で必須であるメッセージがでます。今の所、制御では使っていません。飾りです。 |true|Boolean| |
|description| 説明 |true|String|○|
|type| static/dynamic/dependenceのいずれかを設定します。 また、typeの設定に合わせてdetail_static/detail_dynamic/detail_dependenceのいずれかを設定します。|true|String| |
|quantity| 初期状態での数量を設定します。ユーザーの操作で変動する項目。　特に理由がなければ初期値0を設定します。 |true|Number| |
|cost| 項目の小計を設定します。ユーザーの操作で変動する項目。　特に理由がなければ初期値0を設定します。 |true|Number| |
|detail_static| type:"static"を設定した場合は必須です。 |false|DetailStatic| |
|detail_dynamic| type:"dynamic"を設定した場合は必須です。 |false|DetailDynamic| |
|detail_dependence| type:"dependence"を設定した場合は必須です。 |false|DetailDependence| |


item.type

|Key|Name|Description|input tag|
|-----|----|--------|----|
|static|静的項目|0~1個の注文になる項目|checkbox|
|dynamic|動的項目|0~n個の注文になる項目|range|
|dependence|依存項目|baseとなるプロセスのアイテムの小計に、係数をかけて金額を出す項目|checkbox|


DetailStatic

|Key|Description|Required|Type|Use html|
|-----|-----------|--------|----|:-:|
|unit_cost| 単価 |true|Number| |


DetailDynamic

|Key|Description|Required|Type|Use html|
|-----|-----------|--------|----|:-:|
|unit_name| 単位名 |true|String| |
|unit_mass| 注文単位 例えば本の出版など、100部ずつ発注させたい場合は、100を設定します。 |true|Number| |
|unit_description| 単位の説明 |true|String| |
|unit_cost| 単価 |true|Number| |
|min_quantity| 発注数の最小数。0を設定してください。0以外は未対応。 |true|Number| |
|max_quantity| 発注数の最大数。 |true|Number| |



DetailDependence

|Key|Description|Required|Type|Use html|
|-----|-----------|--------|----|:-:|
|coefficient| 係数 baseとなるプロセスのアイテムの小計にこの係数を掛け合わせたものが、このアイテムのcostになります。 |true|Number| |




### Propagation

アイテムを編集した際に、他のアイテムに対して影響を与えたい場合があります。

例)
- 宇宙船製造の発注をする場合だけ、内装のオプションを注文できるようにしたい。内装だけの注文は断りたい。
- 火星探索を注文した場合、木星探索は発注させたくない。同時にできないから片方だけの注文にさせたい。

あるアイテムAを変化させたときにあるアイテムBに指定した影響を与えるという設定を、`Propagation` 伝播　で行います。


仕様

- 同一グループ内で矛盾した設定も許すが、配列の最後のものが優先される。
- 他グループとの矛盾した設定も許すが、配列の最後のものが優先される。
- 違うカテゴリーのアイテムIDは設定できない。



```json
{
  "categories":
  [
    {
      "propagation_groups":
      [
        {
          "description": "〇〇市内を選んだら他は選べない。〇〇市内を外したら、他のものが選べるようになります。",
          "propagations":
          [
            {
              "from_id": "55dd4635-cf8c-4ee8-8878-1fef35b88b56",
              "to_id": "63107151-869e-4963-af89-5ea5fa966e2c",
              "type": "ONE_TO_DISABLE"
            },
            {
              "from_id": "55dd4635-cf8c-4ee8-8878-1fef35b88b56",
              "to_id": "63107151-869e-4963-af89-5ea5fa966e2c",
              "type": "ZERO_TO_ABLE"
            }
          ]
        },
      ],
    }
  ]
}
```


PropagationGroup

|Key|Description|Required|Type|Use html|
|-----|-----------|--------|----|:-:|
|description| 伝播の説明。 画面には現れません。メモ書き。|false|String| |
|propagations| 伝播設定の配列 |false|[Propagation]| |


Propagation

|Key|Description|Required|Type|
|-----|-----------|--------|----|
|from_id| A側のアイテムのID。 |true|String|
|to_id| B側のアイテムのID。 |true|String|
|type| 伝播のタイプ |true|String|


propagation.type

|Key|Description|
|-----|-----------|
|ZERO_TO_ZERO|Aが0になった時、Bを0にする|
|ONE_TO_ONE|Aが1になった時、Bを1にする|
|N_TO_N|AがNになった時、BをNにする|
|ZERO_TO_DISABLE|Aが0になった時、Bを編集不可にする|
|ZERO_TO_ABLE|Aが0になった時、Bを編集可にする|
|ONE_TO_DISABLE|Aが1になった時、Bを編集不可にする|
|ONE_TO_ABLE|Aが1になった時、Bを編集可にする|



### ExtraLogic

特定の業界、商慣習でのみ活用できる機能を追加していく。


```json
{
  "categories":
  [
    {
      "extra_logic":
      {
        "sum_target_item_quantity": "SumTargetItemQuantity"
      }
    }
  ]
}
```

|Key|Description|Required|Type|Use html|
|-----|-----------|--------|----|:-:|
|sum_target_item_quantity| 特定のアイテムの数の合算を画面上部に出すための設定 |false|[SumTargetItemQuantity]| |


SumTargetItemQuantity

```json
{
  "categories":
  [
    {
      "extra_logic":
      {
        "sum_target_item_quantity": 
        {
          "prefix": "パソコン", 
          "suffix": "台", 
          "target_item_ids":["20c2703f-3243-4284-b6af-4a003d60272d"]
        }
      }
    }
  ]
}

```


|Key|Description|Required|Type|Use html|
|-----|-----------|--------|----|:-:|
|prefix| 接頭辞 |false|String| |
|suffix| 接尾辞 |false|String| |
|target_item_ids| 合算対象のアイテム |false|[String]| |






