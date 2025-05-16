import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/HomeView.vue';
import SignInView from '@/views/SignInView.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'home',
		component: HomeView,
		beforeEnter: (to, from, next) => {
			console.log(to, from);
			const isLogin = false;
			if (isLogin) return next();
			alert('로그인을 해야 합니다.');
		},
	},
	{
		path: '/login',
		name: 'login',
		// route level code-splitting
		// this generates a separate chunk (login.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "login" */ '../views/LoginView.vue'),
	},
	{
		path: '/signIn',
		name: 'signIn',
		component: SignInView,
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

export default router;
