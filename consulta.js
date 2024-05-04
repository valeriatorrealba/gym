const { Pool } = require("pg");

const config = {
    host: "localhost",
    port: 5432,
    database: "gym",
    user: "postgres",
    password: "0000",
};

const pool = new Pool(config);

const insertar = async(datos) =>{
    const consulta = {
        text: "insert into ejercicios values ($1, $2, $3, $4)",
        values: datos,
    }

    const result = await pool.query(consulta);
    return result;
};

const consultar = async() =>{
    const result = await pool.query("select * from ejercicios");
    return result;
};

const editar = async(datos) =>{
    const consulta = {
        text:`update ejercicios set nombre = $1, series = $2, repeticiones = $3, descanso = $4 where nombre = $1 returning *`,
        values: datos,
    };
    const result = await pool.query(consulta);
    return result;
}
const eliminar = async(nombre) => {
    const result = pool.query(`delete from ejercicios where nombre = '${nombre}'`);
    return result;
}

module.exports = { insertar, consultar, editar, eliminar };