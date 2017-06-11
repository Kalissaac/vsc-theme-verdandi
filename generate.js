const path = require("path");
const fs = require("fs");
const color = require("onecolor");

color.RGB.prototype.hexaa = function() {
	var alphaString = Math.round(this._alpha * 255).toString(16);
	return "#" + this.hex().substr(1, 6) + "00".substr(0, 2 - alphaString.length) + alphaString;
};

function invert(c) {
	return c.lightness(1 - c.lightness()).rgb();
}

// colors
const gray = [
	"#f8f9fa",
	"#f1f3f5",
	"#e9ecef",
	"#dee2e6",
	"#ced4da",
	"#adb5bd",
	"#868e96",
	"#495057",
	"#343a40",
	"#212529"
];

const red = [
	"#fff5f5",
	"#ffe3e3",
	"#ffc9c9",
	"#ffa8a8",
	"#ff8787",
	"#ff6b6b",
	"#fa5252",
	"#f03e3e",
	"#e03131",
	"#c92a2a"
];

const green = [
	"#ebfbee",
	"#d3f9d8",
	"#b2f2bb",
	"#8ce99a",
	"#69db7c",
	"#51cf66",
	"#40c057",
	"#37b24d",
	"#2f9e44",
	"#2b8a3e"
];

const blue = [
	"#e8f7ff",
	"#ccedff",
	"#a3daff",
	"#72c3fc",
	"#4dadf7",
	"#329af0",
	"#228ae6",
	"#1c7cd6",
	"#1b6ec2",
	"#1862ab"
];

function generate(gray, red, green, blue) {
	const bg = gray[1];
	const fg = gray[7];
	const stress = blue[5];
	const border = gray[3];
	// token settings
	const keyword = {
		fontStyle: "bold",
		foreground: gray[9].hex()
	};
	const operator = keyword;
	const literal = {
		foreground: gray[9].hex()
	};
	const comment = {
		foreground: gray[5].hex()
	};
	const library = {
		foreground: gray[9].hex()
	};
	const quote = {
		fontStyle: "italic",
		foreground: gray[6].hex()
	};
	const user = {
		foreground: fg.hex()
	};
	const punct = {
		foreground: gray[6].hex()
	};
	const invalid = {
		foreground: red[7].hex()
	};
	const access = {};

	return {
		$schema: "vscode://schemas/color-theme",
		name: "Railgun",
		colors: {
			focusBorder: stress.hex(),
			foreground: fg.hex(),
			errorForeground: red[6].hex(),
			"editor.background": bg.hex(),
			"editor.foreground": fg.hex(),
			"editor.lineHighlightBackground": gray[2].hex(),
			"editorCursor.foreground": stress.hex(),
			"editorLineNumber.foreground": gray[5].hex(),

			"editor.selectionBackground": blue[2].hexaa(),
			"editor.selectionHighlightBackground": blue[1].hexaa(),
			"editor.inactiveSelectionBackground": gray[3].hexaa(),

			"debugToolBar.background": gray[2].hexaa(),
			"editorWidget.background": gray[2].hexaa(),
			"editorSuggestWidget.background": bg.hexaa(),

			"editorGroup.border": border.hex(),
			"editorGroupHeader.noTabsBackground": gray[1].hex(),
			"editorGroupHeader.tabsBackground": gray[2].hex(),
			"tab.border": border.hex(),
			"tab.inactiveBackground": gray[2].hex(),
			"tab.inactiveForeground": gray[6].hex(),
			"tab.activeBackground": gray[1].hex(),
			"tab.activeForeground": gray[9].hex(),

			"peekViewEditor.background": gray[3].alpha(1 / 3).hexaa(),
			"peekViewTitle.background": gray[0].hexaa(),
			"peekView.border": border.hex(),

			"scrollbar.shadow": color("#000000").alpha(0.1).hexaa(),
			"scrollbarSlider.background": color("#000000").alpha(0.075).hexaa(),
			"scrollbarSlider.activeBackground": color("#000000").alpha(0.15).hexaa(),
			"scrollbarSlider.hoverBackground": color("#000000").alpha(0.15).hexaa(),

			"editorOverviewRuler.border": "#00000000",
			"editorGutter.modifiedBackground": blue[5].hex(),
			"editorGutter.addedBackground": green[5].hex(),
			"editorGutter.deletedBackground": red[5].hex(),
			"diffEditor.removedTextBackground": red[5].alpha(0.15).hexaa(),
			"diffEditor.insertedTextBackground": green[5].alpha(0.1).hexaa(),

			"sideBarTitle.foreground": gray[9].hex(),
			"sideBar.background": gray[2].hex(),
			"sideBar.border": border.hex(),
			"sideBarSectionHeader.background": gray[3].hex(),

			"list.highlightForeground": blue[6].hex(),
			"list.hoverBackground": gray[3].hex(),
			"list.inactiveSelectionBackground": gray[5].alpha(0.3).hexaa(),
			"list.activeSelectionBackground": stress.alpha(0.25).hexaa(),
			"list.focusBackground": stress.alpha(0.25).hexaa(),
			"list.inactiveSelectionForeground": gray[9].hex(),
			"list.activeSelectionForeground": gray[9].hex(),
			"list.focusForeground": gray[9].hex(),

			"dropdown.background": gray[0].hex(),
			"dropdown.border": border.hex(),
			"dropdown.foreground": gray[7].hex(),

			"input.background": gray[0].hex(),
			"input.border": border.hex(),
			"input.foreground": gray[7].hex(),
			"input.placeholderForeground": gray[5].hex(),

			"button.background": blue[6].hex(),
			"button.foreground": blue[0].hex(),
			"button.hoverBackground": blue[7].hex(),

			"badge.background": stress.hex(),
			"activityBar.background": gray[4].hex(),
			"activityBar.foreground": gray[8].hex(),

			"statusBar.background": gray[3].hex(),
			"statusBar.foreground": fg.hex(),
			"statusBar.noFolderBackground": gray[3].hex(),
			"statusBar.noFolderForeground": fg.hex(),
			"statusBar.debuggingBackground": gray[3].hex(),
			"statusBar.debuggingForeground": fg.hex(),

			"panel.border": border.hex(),
			"panelTitle.activeBorder": stress.hex()
		},
		tokenColors: [
			{
				name: "Comment",
				scope: "comment, punctuation.comment, punctuation.definition.comment",
				settings: comment
			},
			{
				name: "Operator",
				scope: "keyword.operator",
				settings: operator
			},
			{
				name: "Punctuation",
				scope: "punctuation, delimiter, bracket, brace, paren, delimiter.tag, punctuation.tag, tag.html, tag.xml, meta.property-value punctuation.separator.key-value,punctuation.definition.metadata.md, string.link.md, meta.brace",
				settings: punct
			},
			{
				name: "String",
				scope: "string, meta.property-value.string, support.constant.property-value.string, meta.structure.dictionary.value.json string.quoted.double.json, meta.structure.dictionary.json string.quoted.double.json, meta.preprocessor string",
				settings: quote
			},
			{
				name: "Primitive Literals",
				scope: "constant.numeric, meta.property-value.numeric, support.constant.property-value.numeric, meta.property-value.color, support.constant.property-value.color,constant.language",
				settings: literal
			},
			{
				name: "User names",
				scope: "constant.character, constant.other,entity.name.function, entity.name.class, entity.other.inherited-class, entity.other.attribute-name, entity.name, entity.other.attribute-name, entity.other.attribute-name.html, support.type.property-name, entity.name.tag.table, meta.structure.dictionary.json string.quoted.double.json",
				settings: user
			},
			{
				name: "Keyword",
				scope: "keyword, meta.property-value.keyword, support.constant.property-value.keyword, meta.preprocessor.keyword,keyword.other.use, keyword.other.function.use, keyword.other.namespace, keyword.other.new, keyword.other.special-method, keyword.other.unit, keyword.other.use-as",
				settings: keyword
			},
			{
				name: "Storage",
				scope: "storage, storage.type, storage.type.ts, storage.type.var.ts, storage.type.js, storage.type.var.js, storage.type.const.ts, storage.type.let.ts, storage.type.let.js, storage.type.const.js, entity.name.tag",
				settings: keyword
			},
			{
				name: "Pointer, access, etc",
				scope: "meta.ptr, meta.pointer, meta.address, meta.array.cxx",
				settings: access
			},
			{
				name: "Preprocessor",
				scope: "meta.preprocessor",
				settings: user
			},
			{
				name: "Library",
				scope: "support.type, support.class, support.function, support.constant",
				settings: library
			},
			{
				name: "Invalid",
				scope: "invalid",
				settings: invalid
			},
			{
				name: "Invalid deprecated",
				scope: "invalid.deprecated",
				settings: invalid
			},
			{
				name: "Markdown Title Hash",
				scope: "punctuation.definition.heading.md, entity.name.type.md, beginning.punctuation",
				settings: user
			},
			{
				name: "Markdown titles",
				scope: "markup.heading, entity.name.section",
				settings: keyword
			},
			{
				name: "Markdown Raw",
				scope: "markup.raw, markup.inline.raw, markup.fenced, markup.fenced_code",
				settings: quote
			},
			{
				name: "Markdown link",
				scope: "markup.link, string.other.link.title, string.other.link.description, meta.link.inline, meta.image.inline",
				settings: user
			},
			{
				name: "Makefile Variables",
				scope: "variable.language.makefile, variable.other.makefile",
				settings: user
			},
			{
				scope: "markup.italic",
				settings: {
					fontStyle: "italic"
				}
			},
			{
				scope: "markup.bold",
				settings: {
					fontStyle: "bold"
				}
			},
			{
				name: "CSS Class",
				scope: "entity.other.attribute-name.class.css",
				settings: library
			},
			{
				name: "CSS Tag name",
				scope: "entity.name.tag.css",
				settings: keyword
			},
			{
				name: "CSS Property",
				scope: "meta.property-name.css",
				settings: user
			}
		]
	};
}

fs.writeFileSync(
	path.join(__dirname, "themes", "hildr.json"),
	JSON.stringify(generate(...[gray, red, green, blue].map(g => g.map(color).map(invert))))
);
fs.writeFileSync(
	path.join(__dirname, "themes", "verdandi.json"),
	JSON.stringify(generate(...[gray, red, green, blue].map(g => g.map(color))))
);
