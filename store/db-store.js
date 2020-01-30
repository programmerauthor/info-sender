const Datastore = require('nedb')

const db = new Datastore({
    filename: './assets/data/info.db',
    autoload: true
});


/**
 * 插入数据
 * @param data
 * @returns {Promise<unknown>}
 */
function insert(data){
    return new Promise((resolve,reject) =>{
        db.insert(data,function(err,newDocs){
            if(err){
                reject(err);
            }else{
                resolve(newDocs);
            }
        });
    });
}

/**
 * 查询数据
 * @param query
 * @param projection
 */
function find({ query, projection }){
    return new Promise((resolve, reject) => {
        if(query && projection){
            db.find(query, projection, function(err,docs){
                if(err){
                    reject(err);
                }else{
                    resolve(docs);
                }
            });
        }else if(query){
            db.find(query,function(err,docs){
                if(err){
                    reject(err);
                }else{
                    resolve(docs);
                }
            })
        }else{
            reject('query is a required parameter');
        }
    });
}

//.sort({ planet: 1 }).skip(1).limit(2).exec
/**
 * 有限的排序规则，不能覆盖所有条件
 * 目前仅支持排序，并截取数量
 * 后续有需要再拓展
 * @param selector
 * @param limit
 */
function findAndSort({query, sortQuery,limit}){
    return new Promise((resolve, reject) => {
        if(!sortQuery){
            reject('sortQuery is a required parameter');
        }else {
            let cursor;
            if(query && sortQuery && limit){
                cursor = db.find(query).sort(sortQuery).limit(limit);
            }else if(query && sortQuery){
                cursor = db.find(query).sort(sortQuery);
            }else if(sortQuery){
                cursor = db.find({}).sort(sortQuery).limit(limit);
            }else{
                reject('error');
            }
            cursor.exec(function(err,docs){
                if(err){
                    reject(err);
                }else{
                    resolve(docs);
                }
            });
        }
    });
}


module.exports = {
    insert:insert,
    find:find,
    findAndSort:findAndSort
}