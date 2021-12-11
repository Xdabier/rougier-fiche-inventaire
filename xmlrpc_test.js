const Odoo = require('odoo-xmlrpc');
// // Creates an XML-RPC server to listen to XML-RPC method calls
// const server = xmlrpc.createServer({host: '207.180.249.27', port: 8020});
// // Handle methods not found
// server.on('NotFound', (method) => {
//     console.log(`Method ${method} does not exist`);
// });
// // Handle method calls by listening for events with the method call name
// server.on('anAction', (err, params, callback) => {
//     console.log(`Method call params for 'anAction': ${params}`);
//
//     // ...perform an action...
//
//     // Send a method response with a value
//     callback(null, 'aResult');
// });
// console.log('XML-RPC server listening on port 9091');

// Waits briefly to give the XML-RPC server time to start up and start
// listening
setTimeout(() => {
    // Creates an XML-RPC client. Passes the host information on where to
    // make the XML-RPC calls.
    const url = 'http://207.180.249.27';
    const port = '8032';
    const db = 'RG_GABON_DB';
    const user = 'fedia.belhoula@gmail.com';
    const pwd = '2020@dmin';

    const odoo = new Odoo({
        url,
        port,
        db,
        username: user,
        password: pwd
    });

    odoo.connect((err) => {
        if (err) {
            return console.log(err);
        }

        return odoo.execute_kw(
            'reforest.fiche_saisie_mobile',
            'create',
            [
                [
                    {
                        "aac": "7-5-9",
                        "creation_date": "05/17/21",
                        "cuber": "S08279",
                        "id": "Abcy",
                        "billes": [
                            {
                                "bar_code": "5449484",
                                "dgb": 54,
                                "diameter": 49,
                                "dpb": 44,
                                "gasoline": "MOA",
                                "id": "45464/944",
                                "indicator": 944,
                                "length": 45464,
                                "logging": 45464,
                                "quality": "Gaa",
                                "status": "Sbss",
                                "status_pattern": "Jjj",
                                "volume": 2.365
                            },
                            {
                                "bar_code": "1111113131215454",
                                "dgb": 12,
                                "diameter": 28,
                                "dpb": 44,
                                "gasoline": "TCH",
                                "id": "4444/44444",
                                "indicator": 44444,
                                "length": 4444,
                                "logging": 4444,
                                "quality": "Aaa",
                                "volume": 2.736
                            },
                            {
                                "bar_code": "55449794646",
                                "dgb": 444,
                                "diameter": 444,
                                "dpb": 444,
                                "gasoline": "KOS",
                                "id": "144/1441",
                                "indicator": 1441,
                                "length": 144,
                                "logging": 144,
                                "quality": "Aaaaa",
                                "volume": 6881.276
                            }
                        ],
                        "site": "24MO",
                        "sync": true,
                        "sync_date": "06/02/21"
                    }
                ]
            ],
            (_err, value) => {
                if (_err) {
                    return console.log(_err);
                }
                return console.log('Result: ', value);
            }
        );
    });
}, 1000);
