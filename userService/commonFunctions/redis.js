import redis from 'redis';

const redisOptions = process.env.REDIS_URL ? {
    url: process.env.REDIS_URL
} : {
    port: process.env.REDIS_PORT || 6379,
    host: process.env.REDIS_HOST || "localhost"
};
export const client = redis.createClient(redisOptions);

client.on('connect', function () {
    console.log('Connected!');
});

export const setKey = (key, data) => {
    return client.set(key, data);
};

export const setKeyWithExpiry = (key, data, expiry=300) => {
    return client.setEx(key, expiry, data);
}

export const getKey = (key) => {
    return client.get(key);
};

export const delKey = (key) => {
    return client.del(key);
};

export const increamentKey = (key) => {
    return client.incr(key);
};

