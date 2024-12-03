import bcrypt from 'bcrypt';
import logger from '../logs/logger.js';
import 'dotenv/config';

export const encriptar = async (texto) => {
    try {
        const saltRouds = +process.env.BCRYPT_SALT_ROUNDS;
        return await bcrypt.hash(texto, saltRouds);
    } catch (error) {
        logger.error(error.message);
        throw new Error('Error al encriptar');
    }

};

export const comparar = async(texto, hash) => {
    try {
        return await bcrypt.compare(texto, hash);
    } catch (error) {
        logger.error(error.message);
        throw new Error('Error al comparar');
    }
};