const sqlFormatter = require('sql-formatter');

console.log('Exported members:', Object.keys(sqlFormatter));

const query = "SELECT * FROM users WHERE name = 'Juan'";

try {
    const formatted = sqlFormatter.format(query, {
        language: 'sql',
        tabWidth: 2,
        keywordCase: 'upper'
    });
    console.log('Formatted Query Success!');
    console.log(formatted);
} catch (error) {
    console.log('Error Name:', error.name);
    console.log('Error Message:', error.message);
    console.log('Error Stack:', error.stack);
}
