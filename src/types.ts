export interface IDataItem{
    data:any,
    description:string,
    Icon?:any,
    unit?:string
}
export interface IDataItemPair{
    data1:IDataItem,
    data2:IDataItem
}
export interface ICityResult{
    country: string,
    name: string,
    lat: string,
    lng: string
 }