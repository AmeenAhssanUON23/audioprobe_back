const getPagination = (page, size) => {
    const limit = size ? +size : 10;
    const offset = page ? (page-1) * limit : 0;
    return { limit, offset };};
const getPagingData = (datas, page, limit) => {
    const { count: totalCount, rows: data } = datas;
    const currentPage = page ? +page : 1;
    const totalPages = Math.ceil(totalCount / limit);
    
    return { 
        response:"success",
        totalCount, data, totalPages, currentPage };};
module.exports={
    getPagination,
    getPagingData
}