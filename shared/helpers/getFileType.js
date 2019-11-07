module.exports = (fileName) => {
    const types = {
        'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'word': 'application/msword',
        'xls': 'application/excel',
        'pdf': 'application/pdf',
        'png': 'image/png',
        'jpg': 'image/jpeg',
        'jpeg': 'image/jpeg',
        'html': 'text/html',
        'csv': 'text/csv',
        'txt': 'text/plain',
        'json': 'application/json'
    }

    const [, fileExtension] = fileName.split('.');
    return types[fileExtension];
}