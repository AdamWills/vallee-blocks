/**
 * Use this file for JavaScript code that you want to run in the front-end
 * on posts/pages that contain this block.
 *
 * When this file is defined as the value of the `viewScript` property
 * in `block.json` it will be enqueued on the front end of the site.
 *
 * Example:
 *
 * ```js
 * {
 *   "viewScript": "file:./view.js"
 * }
 * ```
 *
 * If you're not making any changes to this file because your project doesn't need any
 * JavaScript running in the front-end, then you should delete this file and remove
 * the `viewScript` property from `block.json`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#view-script
 */

/* eslint-disable no-console */

const members = document.querySelectorAll(".vallee-team-member-block__has-bio");
const dialogs = document.querySelectorAll("[data-vtm-dialog]");

members.forEach((member) => {
	member.addEventListener("click", (event) => {
		if (
			event.target.nodeName !== "DIALOG" &&
			event.target.nodeName !== "BUTTON"
		) {
			const dialog = member.querySelector(`dialog`);
			dialog.showModal();
		}
	});
});

dialogs.forEach((d) => {
	d.addEventListener("click", (event) => {
		if (event.target.nodeName === "DIALOG") {
			d.close();
		}
	});
	const close = d.querySelector(".vallee-team-member-block__biography-close");
	close.addEventListener("click", () => {
		d.close();
	});
});

/* eslint-enable no-console */