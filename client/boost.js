import io from './libs/socketio.1.4.5.min.js';
import hash from 'object-hash';

class Boost {
    subscribe(path) {
        let ret = {};
        ret.data = null;

        this.connection = io.connect(path);
        this.path = path;

        this.connection.on('connect', () => {
            this.verify_data(ret);
            this.continious_updates(ret);
        });

        return ret;
    }

    verify_data(ret) {
        let existing_data = localStorage[this.path];
        if (existing_data) {
            let data_hash = hash(existing_data);
            this.connection.emit('verify_data', data_hash);
            this.connection.on('verify_response', res => {
                if (res.valid) {
                    // Server verifies that data is valid. Return it to the component.
                    ret.data = existing_data;
                } else {
                    // Server does not validate data. Request new data.
                    this.request_data(ret);
                }
            });
        } else {
            // No data cached. Request new data.
            this.request_data(ret);
        }
    }

    request_data(ret) {
        this.connection.emit('get_data');
        this.connection.on('data_response', response => {
            localStorage[this.path] = JSON.stringify(response.data);
            ret.data = JSON.stringify(response.data);
        });
    }

    continious_updates(ret) {
        this.connection.on('update', function(type) {
            console.log(type);
            if (!ret.data) {
                console.log('Data not yet ready. Don\'t apply updates');
            }
            // localStorage[connection.path] = JSON.stringify(data);
            // ret.data = JSON.stringify(data);
        });
    }
}

export default new Boost();
