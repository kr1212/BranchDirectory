function paginate(array, page, limit){
    const offSet = (page-1)*limit
    const paginatedItems = array.slice(offSet, offSet + limit)

    return {
        page,
        limit,
        totalItems: array.length,
        totalPages: Math.ceil(array.length / limit),
        data: paginatedItems
    }
}

module.exports = paginate