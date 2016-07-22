import io from './libs/socketio.1.4.5.min.js';
import hash from 'object-hash';

class Boost {
    subscribe(path) {
        let ret = {};
        ret.data = null;

        this.connection = io.connect(path);
        this.path = path;

        this.connection.on('connect', () => {
            console.log('connected to ' + path);

            let existing_data = localStorage[path];
            if (existing_data) {
                console.log('Existing Data');
                this.verify_data(existing_data, ret);
            } else {
                console.log('No Existing Data');
                this.request_data(ret);
            }
        });

        return ret;
    }

    verify_data(data, ret) {
        let data_hash = hash(data);
        this.connection.emit('verify_data', data_hash);
        this.connection.on('verify_response', res => {
            if (res.valid) {
                console.log('Data is valid');
                ret.data = data;
                this.continious_updates(ret);
            } else {
                console.log('Existing data is invalid');
                this.request_data(ret);
            }
        });
    }

    request_data(ret) {
        console.log('requesting data');
        this.connection.emit('get_data');

        this.connection.on('data_response', response => {
            console.log(response);
            localStorage[this.path] = JSON.stringify(response.data);
            ret.data = JSON.stringify(response.data);
            this.continious_updates(ret);
        });
    }

    continious_updates(ret) {
        console.log('starting continious updates');

        this.connection.on('update', function(type) {
            console.log(type);
            // localStorage[connection.path] = JSON.stringify(data);
            // ret.data = JSON.stringify(data);
        });
    }
}

// export default Boost;
export default new Boost();
