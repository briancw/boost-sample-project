<template>
    <footer id="footer">
        Copyright &copy; {{ moment(new Date()).format('YYYY') }}<br />
    </footer>
</template>

<script>
    import moment from '../../libs/moment.min.js';
    export default {
        name: 'footer',
        methods: {
            moment: function(date) {
                return moment(date);
            },
        },
    };
</script>
