import redis from 'redis';

export const client = redis.createClient({
    port: 6379,
    host: 'localhost'
})

client.on('connect', function () {
    console.log('Connected!');
});

export const setKey = (key, data) => {
    return client.set(key, data);
};

export const getKey = (key) => {
    return client.get(key);
};

export const delKey = (key) => {
    return client.del(key);
};

