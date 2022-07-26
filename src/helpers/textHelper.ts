export default function (){
  const todayStr = (): string => {
    const today = new Date();
    return today.getFullYear() + '年' + (today.getMonth()+1) + '月' + today.getDate() + '日'
  };
  return {
    todayStr
  }
}