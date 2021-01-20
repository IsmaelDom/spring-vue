import service from '../services/Login';

const user = JSON.parse(localStorage.getItem('user'));//Se obtienen los datos de autenticacion
//El estado inicial se inicializa con un status y un user dependiendo de loggedIn
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };

export const auth = {
  namespaced: true,
  state: initialState,
  //En actions se declaran los metodos a usar login, logout.
  actions: {
        login({ commit }, user) {
            console.log(user);
            return service.login(user)
            .then(user => {
                    commit('loginSuccess', user);
                    return Promise.resolve(user);
            },
            error => {
                commit('loginFailure', error);
                return Promise.reject(error);
            });
    },

    logout({ commit }) {
        service.logout();
        commit('logout');
    },
    //Este metodo no se usa
    register({ commit }, user) {
        return service.guardar(user).then(
            response => {
                commit('registerSuccess');
                return Promise.resolve(response.data);
            },
            error => {
                commit('registerFailure');
                return Promise.reject(error);
            }
        );
    }
  },

    //Cambia los estados dependiendo si se loggeo correctamente, fallo o cerro sesión
    mutations: {
        loginSuccess(state, user) {
            state.status.loggedIn = true;
            state.user = user;
        },

        loginFailure(state) {
            state.status.loggedIn = false;
            state.user = null;
        },

        logout(state) {
            state.status.loggedIn = false;
            state.user = null;
        },
        //Este metodo no se usa
        registerSuccess(state) {
            state.status.loggedIn = false;
        },
        //Este metodo no se usa
        registerFailure(state) {
            state.status.loggedIn = false;
        }
    }
};