module.exports = (queryString) => {
    ['eq', 'in', 'gt', 'gte', 'lt', 'lte'];
    const query = {};
    queryString = queryString.split('&');

    queryString.forEach(query => {
        if(query.includes(' or ')) {
            
        }
        const [, field, operation, value] = query.match(/(\w*)\[?(\w{0,3})\]?=(.*)/);
        
        if(operation == 'eq') {
            return queryString[field] = value;
        }

        if(operation == 'or') {

        }

        if(operation)
    })
}   