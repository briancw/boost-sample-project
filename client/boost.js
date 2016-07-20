import io from './libs/socketio.1.4.5.min.js';

class Boost {
    subscribe(component, variable, path) {
        let new_conn = io.connect(path);
        new_conn.on('connect', socket => {
            console.log('connected to ' + path);

            let existing_data = localStorage[path];
            if (existing_data) {
                console.log('Existing Data ' + existing_data);
                component[variable] = existing_data;
                this.continious_updates(new_conn, path, component, variable);
            } else {
                console.log('No Existing Data');
                this.request_data(new_conn, path, component, variable);
            }
        });

        let return_object = {
            get current() {
                return localStorage[path];
            },
        };

        return return_object;
    }

    request_data(connection, path, component, variable) {
        console.log('requesting data');
        connection.emit('get_data');

        connection.on('data_response', data => {
            localStorage[path] = JSON.stringify(data);
            component[variable] = data;

            this.continious_updates(connection, path, component, variable);
        });
    }

    continious_updates(connection, path, component, variable) {
        console.log('starting continious updates');

        connection.on('update', function(data) {
            localStorage[path] = JSON.stringify(data);
            component[variable] = JSON.stringify(data);
        });
    }
}

export default Boost;
