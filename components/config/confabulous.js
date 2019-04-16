/* eslint no-unused-vars: 0 */

const path = require('path');

module.exports = ({ confabulous } = {}) => {
	const Confabulous = confabulous || require('confabulous');
	const { loaders } = Confabulous;

	const start = (params, cb) => {
		new Confabulous()
			.add(config => loaders.require({ path: path.join(process.cwd(), 'config', 'default.js'), watch: true }))
			.add(config =>
				loaders.require({
					path: path.join(process.cwd(), 'config', `${process.env.LIBER_ENV}.js`),
					mandatory: false,
				}),
			)
			.add(config =>
				loaders.require({ path: path.join(process.cwd(), 'secrets', 'secrets.json'), watch: true, mandatory: false }),
			)
			.add(config => loaders.args())
			.on('loaded', cb)
			.on('error', cb)
			.end(cb);
	};

	return { start };
};
