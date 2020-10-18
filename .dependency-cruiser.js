module.exports = {
	forbidden: [
		{
			name: "only-index-relations",
			comment: "Don't allow direct relations between modules",
			severity: "error",
			from: { path: "^src/modules/([^/]+)/.+" },
			to: {
				path: "^src/modules/([^/]+)/[^(index.ts|model.ts)]",
				pathNot: "^src/modules/$1/.+",
			},
		},
		/* rules from the 'recommended' preset: */
		{
			name: "no-circular",
			severity: "warn",
			comment:
				"This dependency is part of a circular relationship. You might want to revise " +
				"your solution (i.e. use dependency inversion, make sure the modules have a single responsibility) ",
			from: {},
			to: { circular: true },
		},
		{
			name: "no-orphans",
			comment:
				"This is an orphan module - it's likely not used (anymore?). Either use it or " +
				"remove it. If it's logical this module is an orphan (i.e. it's a config file), " +
				"add an exception for it in your dependency-cruiser configuration. By default " +
				"this rule does not scrutinize dotfiles (e.g. .eslintrc.js), TypeScript declaration " +
				"files (.d.ts), tsconfig.json and some of the babel and webpack configs.",
			severity: "warn",
			from: {
				orphan: true,
				pathNot: [
					"(^|/)\\.[^/]+\\.(js|cjs|mjs|ts|json)$", // dot files
					"\\.d\\.ts$", // TypeScript declaration files
					"(^|/)tsconfig\\.json$", // TypeScript config
					"(^|/)(babel|webpack)\\.config\\.(js|cjs|mjs|ts|json)$", // other
					// configs
				],
			},
			to: {},
		},
		{
			name: "no-deprecated-core",
			comment:
				"A module depends on a node core module that has been deprecated. Find an alternative - these are " +
				"bound to exist - node doesn't deprecate lightly.",
			severity: "warn",
			from: {},
			to: {
				dependencyTypes: ["core"],
				path: "^(punycode|domain|constants|sys|_linklist|_stream_wrap)$",
			},
		},
		{
			name: "not-to-deprecated",
			comment:
				"This module uses a (version of an) npm module that has been deprecated. Either upgrade to a later " +
				"version of that module, or find an alternative. Deprecated modules are a security risk.",
			severity: "warn",
			from: {},
			to: { dependencyTypes: ["deprecated"] },
		},
		{
			name: "no-non-package-json",
			severity: "error",
			comment:
				"This module depends on an npm package that isn't in the 'dependencies' section of your package.json. " +
				"That's problematic as the package either (1) won't be available on live (2 - worse) will be " +
				"available on live with an non-guaranteed version. Fix it by adding the package to the dependencies " +
				"in your package.json.",
			from: {},
			to: { dependencyTypes: ["npm-no-pkg", "npm-unknown"] },
		},
		{
			name: "not-to-unresolvable",
			comment:
				"This module depends on a module that cannot be found ('resolved to disk'). If it's an npm " +
				"module: add it to your package.json. In all other cases you likely already know what to do.",
			severity: "error",
			from: {},
			to: { couldNotResolve: true },
		},
		{
			name: "no-duplicate-dep-types",
			comment:
				"Likeley this module depends on an external ('npm') package that occurs more than once " +
				"in your package.json i.e. bot as a devDependencies and in dependencies. This will cause " +
				"maintenance problems later on.",
			severity: "warn",
			from: {},
			to: { moreThanOneDependencyType: true },
		},

		/* rules you might want to tweak for your specific situation: */
		{
			name: "not-to-spec",
			comment:
				"This module depends on a spec (test) file. The sole responsibility of a spec file is to test code. " +
				"If there's something in a spec that's of use to other modules, it doesn't have that single " +
				"responsibility anymore. Factor it out into (e.g.) a separate utility/ helper or a mock.",
			severity: "error",
			from: {},
			to: { path: "\\.spec\\.(js|mjs|cjs|ts|ls|coffee|litcoffee|coffee\\.md)$" },
		},
		{
			name: "not-to-dev-dep",
			severity: "error",
			comment:
				"This module depends on an npm package from the 'devDependencies' section of your " +
				"package.json. It looks like something that ships to production, though. To prevent problems " +
				"with npm packages that aren't there on production declare it (only!) in the 'dependencies'" +
				"section of your package.json. If this module is development only - add it to the " +
				"from.pathNot re of the not-to-dev-dep rule in the dependency-cruiser configuration",
			from: {
				path: "^(src)",
				pathNot: "\\.spec\\.(js|mjs|cjs|ts|ls|coffee|litcoffee|coffee\\.md)$",
			},
			to: { dependencyTypes: ["npm-dev"] },
		},
		{
			name: "optional-deps-used",
			severity: "info",
			comment:
				"This module depends on an npm package that is declared as an optional dependency " +
				"in your package.json. As this makes sense in limited situations only, it's flagged here. " +
				"If you're using an optional dependency here by design - add an exception to your" +
				"depdency-cruiser configuration.",
			from: {},
			to: { dependencyTypes: ["npm-optional"] },
		},
		{
			name: "peer-deps-used",
			comment:
				"This module depends on an npm package that is declared as a peer dependency " +
				"in your package.json. This makes sense if your package is e.g. a plugin, but in " +
				"other cases - maybe not so much. If the use of a peer dependency is intentional " +
				"add an exception to your dependency-cruiser configuration.",
			severity: "warn",
			from: {},
			to: { dependencyTypes: ["npm-peer"] },
		},
	],
	options: {
		doNotFollow: {
			path: "node_modules",
			dependencyTypes: ["npm", "npm-dev", "npm-optional", "npm-peer", "npm-bundled", "npm-no-pkg"],
		},
		exclude: {
			path: "(^src/react-app-env.d.ts)|(^src/store.ts)|(^src/shared)|(^src/modules/text)",
		},
		includeOnly: "^src/",
		tsPreCompilationDeps: false,
		tsConfig: { fileName: "tsconfig.json" },
		reporterOptions: {
			dot: {
				theme: {
					replace: false,
					graph: {
						ordering: "out",
						rankdir: "LR",
						splines: "ortho",
						overlap: "false",
						nodesep: "0.16",
						ranksep: "0.18",
						fontname: "Helvetica-bold",
						fontsize: "9",
						style: "rounded,bold,filled",
						fillcolor: "#ffffff",
						compound: "true",
						concentrate: "true",
					},
					node: {
						shape: "box",
						style: "rounded, filled",
						height: "0.2",
						color: "black",
						fillcolor: "#ffffcc",
						fontcolor: "black",
						fontname: "Helvetica",
						fontsize: 9,
					},
					edge: {
						arrowhead: "normal",
						arrowsize: "0.6",
						penwidth: "2.0",
						color: "#00000033",
						fontname: "Helvetica",
						fontsize: "9",
						concentrate: "true",
					},
					modules: [
						{
							criteria: { consolidated: true },
							attributes: { shape: "box3d" },
						},
						{
							criteria: { "rules[0].severity": "error" },
							attributes: { fontcolor: "red", color: "red" },
						},
						{
							criteria: { "rules[0].severity": "warn" },
							attributes: { fontcolor: "orange", color: "orange" },
						},
						{
							criteria: { "rules[0].severity": "info" },
							attributes: { fontcolor: "blue", color: "blue" },
						},
						{
							criteria: { valid: false },
							attributes: { fontcolor: "red", color: "red" },
						},
						{
							criteria: { couldNotResolve: true },
							attributes: { color: "red", fontcolor: "red" },
						},
						{
							criteria: { coreModule: true },
							attributes: { color: "grey", fontcolor: "grey" },
						},
						{
							criteria: { source: "node_modules" },
							attributes: { fillcolor: "#c40b0a1a", fontcolor: "#c40b0a" },
						},
						{
							criteria: { matchesDoNotFollow: true },
							attributes: { shape: "folder" },
						},
						{
							criteria: { orphan: true },
							attributes: { fillcolor: "#ccffcc" },
						},
						{
							criteria: { source: "\\.json$" },
							attributes: { fillcolor: "#ffee44" },
						},
						{
							criteria: { source: "\\.jsx$" },
							attributes: { fillcolor: "#ffff77" },
						},
						{
							criteria: { source: "\\.vue$" },
							attributes: { fillcolor: "#41f083" },
						},
						{
							criteria: { source: "\\.ts$" },
							attributes: { fillcolor: "#ddfeff" },
						},
						{
							criteria: { source: "\\.tsx$" },
							attributes: { fillcolor: "#bbfeff" },
						},
						{
							criteria: { source: "(\\.coffee|\\.litcoffee|\\.coffee\\.md)$" },
							attributes: { fillcolor: "#eeccaa" },
						},
						{
							criteria: { source: "(\\.csx|\\.cjsx)$" },
							attributes: { fillcolor: "#eebb77" },
						},
						{
							criteria: { source: "\\.ls$/g" },
							attributes: { fillcolor: "pink" },
						},
					],
					dependencies: [
						{
							criteria: { "rules[0].severity": "error" },
							attributes: { fontcolor: "red", color: "red" },
						},
						{
							criteria: { "rules[0].severity": "warn" },
							attributes: { fontcolor: "orange", color: "orange" },
						},
						{
							criteria: { "rules[0].severity": "info" },
							attributes: { fontcolor: "blue", color: "blue" },
						},
						{
							criteria: { valid: false },
							attributes: { fontcolor: "red", color: "red" },
						},
						{
							criteria: { circular: true },
							attributes: { arrowhead: "normalnoneodot" },
						},
						{
							criteria: { preCompilationOnly: true },
							attributes: { arrowhead: "onormal", penwidth: "1.0" },
						},
						{
							criteria: { coreModule: true },
							attributes: { style: "dashed", penwidth: "1.0" },
						},
						{
							criteria: { "dependencyTypes[0]": "npm" },
							attributes: { style: "dashed", penwidth: "1.0" },
						},
					],
				},
			},
			archi: {
				collapsePattern: "(^src/modules/([^/]+))|(^src/shared)",
				theme: {
					replace: false,
					graph: {
						ordering: "out",
						rankdir: "LR",
						splines: "ortho",
						overlap: "false",
						nodesep: "0.16",
						ranksep: "0.18",
						fontname: "Helvetica-bold",
						fontsize: "9",
						style: "rounded,bold,filled",
						fillcolor: "#ffffff",
						compound: "true",
						concentrate: "true",
					},
					node: {
						shape: "box",
						style: "rounded, filled",
						height: "0.2",
						color: "black",
						fillcolor: "#ffffcc",
						fontcolor: "black",
						fontname: "Helvetica",
						fontsize: 9,
					},
					edge: {
						arrowhead: "normal",
						arrowsize: "0.6",
						penwidth: "2.0",
						color: "#00000033",
						fontname: "Helvetica",
						fontsize: "9",
					},
					modules: [
						{
							criteria: { consolidated: true },
							attributes: { shape: "box3d" },
						},
						{
							criteria: { "rules[0].severity": "error" },
							attributes: { fontcolor: "red", color: "red" },
						},
						{
							criteria: { "rules[0].severity": "warn" },
							attributes: { fontcolor: "orange", color: "orange" },
						},
						{
							criteria: { "rules[0].severity": "info" },
							attributes: { fontcolor: "blue", color: "blue" },
						},
						{
							criteria: { valid: false },
							attributes: { fontcolor: "red", color: "red" },
						},
						{
							criteria: { couldNotResolve: true },
							attributes: { color: "red", fontcolor: "red" },
						},
						{
							criteria: { coreModule: true },
							attributes: { color: "grey", fontcolor: "grey" },
						},
						{
							criteria: { source: "node_modules" },
							attributes: { fillcolor: "#c40b0a1a", fontcolor: "#c40b0a" },
						},
						{
							criteria: { matchesDoNotFollow: true },
							attributes: { shape: "folder" },
						},
						{
							criteria: { orphan: true },
							attributes: { fillcolor: "#ccffcc" },
						},
						{
							criteria: { source: "\\.json$" },
							attributes: { fillcolor: "#ffee44" },
						},
						{
							criteria: { source: "\\.jsx$" },
							attributes: { fillcolor: "#ffff77" },
						},
						{
							criteria: { source: "\\.vue$" },
							attributes: { fillcolor: "#41f083" },
						},
						{
							criteria: { source: "\\.ts$" },
							attributes: { fillcolor: "#ddfeff" },
						},
						{
							criteria: { source: "\\.tsx$" },
							attributes: { fillcolor: "#bbfeff" },
						},
						{
							criteria: { source: "(\\.coffee|\\.litcoffee|\\.coffee\\.md)$" },
							attributes: { fillcolor: "#eeccaa" },
						},
						{
							criteria: { source: "(\\.csx|\\.cjsx)$" },
							attributes: { fillcolor: "#eebb77" },
						},
						{
							criteria: { source: "\\.ls$/g" },
							attributes: { fillcolor: "pink" },
						},
					],
					dependencies: [
						{
							criteria: { "rules[0].severity": "error" },
							attributes: { fontcolor: "red", color: "red" },
						},
						{
							criteria: { "rules[0].severity": "warn" },
							attributes: { fontcolor: "orange", color: "orange" },
						},
						{
							criteria: { "rules[0].severity": "info" },
							attributes: { fontcolor: "blue", color: "blue" },
						},
						{
							criteria: { valid: false },
							attributes: { fontcolor: "red", color: "red" },
						},
						{
							criteria: { circular: true },
							attributes: { arrowhead: "normalnoneodot" },
						},
						{
							criteria: { preCompilationOnly: true },
							attributes: { arrowhead: "onormal", penwidth: "1.0" },
						},
						{
							criteria: { coreModule: true },
							attributes: { style: "dashed", penwidth: "1.0" },
						},
						{
							criteria: { "dependencyTypes[0]": "npm" },
							attributes: { style: "dashed", penwidth: "1.0" },
						},
					],
				},
			},
		},
	},
};
