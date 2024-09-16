const fs = require("fs-extra");
const { config } = global.GoatBot;
const { client } = global;

module.exports = {
	config: {
		name: "adminonly",
		aliases: ["adonly", "onlyad", "onlyadmin"],
		version: "1.5",
		author: "NTKhang",
		countDown: 5,
		role: 2,
		description: {
			vi: "bật/tắt chế độ chỉ admin mới có thể sử dụng bot",
			en: "turn on/off only admin can use bot"
		},
		category: "owner",
		guide: {
			vi: "   {pn} [on | off]: bật/tắt chế độ chỉ admin mới có thể sử dụng bot"
				+ "\n   {pn} noti [on | off]: bật/tắt thông báo khi người dùng không phải là admin sử dụng bot",
			en: "   {pn} [on | off]: turn on/off the mode only admin can use bot"
				+ "\n   {pn} noti [on | off]: turn on/off the notification when user is not admin use bot"
		}
	},

	langs: {
		vi: {
			turnedOn: "Đã bật chế độ chỉ admin mới có thể sử dụng bot",
			turnedOff: "Đã tắt chế độ chỉ admin mới có thể sử dụng bot",
			turnedOnNoti: "Đã bật thông báo khi người dùng không phải là admin sử dụng bot",
			turnedOffNoti: "Đã tắt thông báo khi người dùng không phải là admin sử dụng bot"
		},
		en: {
			turnedOn: "𝘚𝘦𝘶𝘭 𝘮𝘰𝘯 𝘤𝘩𝘦𝘧 𝘱𝘦𝘶𝘵 𝘮'𝘶𝘵𝘪𝘭𝘪𝘴𝘦𝘳.....😁",
			turnedOff: "𝘓'𝘢𝘥𝘮𝘪𝘯 𝘷𝘰𝘶𝘴 𝘢𝘶𝘵𝘰𝘳𝘪𝘴𝘦𝘯𝘵 𝘢̀ 𝘮'𝘶𝘵𝘪𝘭𝘪𝘴𝘪𝘴𝘦𝘳...😁",
			turnedOnNoti: "𝘓𝘢 𝘯𝘰𝘵𝘪𝘧𝘪𝘤𝘢𝘵𝘪𝘰𝘯 𝘱𝘦𝘶𝘵-𝘦̂𝘵𝘳𝘦 𝘶𝘵𝘪𝘭𝘪𝘴𝘦𝘳 𝘱𝘢𝘳 𝘵𝘰𝘶𝘵 𝘭𝘦 𝘮𝘰𝘯𝘥𝘦...😐",
			turnedOffNoti: "𝘚𝘦𝘶𝘭 𝘭'𝘢𝘥𝘮𝘪𝘯 𝘶𝘵𝘪𝘭𝘪𝘴𝘦 𝘭𝘢 𝘯𝘰𝘵𝘪𝘧𝘪𝘤𝘢𝘵𝘪𝘰𝘯....😐"
		}
	},

	onStart: function ({ args, message, getLang }) {
		let isSetNoti = false;
		let value;
		let indexGetVal = 0;

		if (args[0] == "noti") {
			isSetNoti = true;
			indexGetVal = 1;
		}

		if (args[indexGetVal] == "on")
			value = true;
		else if (args[indexGetVal] == "off")
			value = false;
		else
			return message.SyntaxError();

		if (isSetNoti) {
			config.hideNotiMessage.adminOnly = !value;
			message.reply(getLang(value ? "turnedOnNoti" : "turnedOffNoti"));
		}
		else {
			config.adminOnly.enable = value;
			message.reply(getLang(value ? "turnedOn" : "turnedOff"));
		}

		fs.writeFileSync(client.dirConfig, JSON.stringify(config, null, 2));
	}
};
