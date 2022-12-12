function assert(deuCerto) {
    if(!deuCerto) {
        throw new Error("Deveria dar True");
    }
    //console.log("Ok");
}

function assertEquals(a,b) {
    if(a != b) {
        throw new Error(a+" != "+b);
    }
    //console.log(a+" == "+b);
}

// https://stackoverflow.com/questions/24586110/resolve-promises-one-after-another-i-e-in-sequence
// broken down to for easier understanding

const concat = list => Array.prototype.concat.bind(list);
const promiseConcat = f => x => f().then(concat(x));
const promiseReduce = (acc, x) => acc.then(promiseConcat(x));
/*
 * serial executes Promises sequentially.
 * @param {funcs} An array of funcs that return promises.
 * @example
 * const urls = ['/url1', '/url2', '/url3']
 * serial(urls.map(url => () => $.ajax(url)))
 *     .then(console.log.bind(console))
 */
const serial = funcs => funcs.reduce(promiseReduce, Promise.resolve([]));

// cada teste deve ser uma função que retorna uma promise e não uma promise
// para executar mesmo precisa chamar o retorno
function testAll(context,...tests) {
    return () => {
        return serial([
            test(context,() => {
                console.log("############################################################");
                console.log("INICIANDO TESTES EM "+context);
                console.log("############################################################");
            })
            ,...tests])
        .then(() => {
            console.log("############################################################");
            console.log("SUCESSO NOS TESTES EM "+context);
            console.log("############################################################");
        })
        .catch((reason) => {
            console.log("############################################################");
            console.log("FALHA NOS TESTES EM "+context);
            console.log("############################################################");
        });
    };
}

// Retorna uma função que quando chamada retorna uma promise
function test(desc, fn) {
    return () => {
        return new Promise((resolve,reject) => {
            try {
                let ret = fn();
                if(ret && typeof ret.then === 'function')
                {
                    ret.then(() => {
                        console.log(desc,"OK");
                        resolve(desc);
                    })
                    .catch((reason) => {
                        console.log("Erro no teste: ",desc);
                        console.error(reason);
                        reject(reason);
                    });
                }
                else {
                    console.log(desc,"OK");
                    resolve(desc);
                }
            } catch (error) {
                console.log("Erro no teste ",desc);
                console.error(error);
                reject(error);
            }
        });
    };
}

export {assert, assertEquals, test, testAll};