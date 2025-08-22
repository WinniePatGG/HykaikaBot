const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sendrules')
        .setDescription('Send an embed to a specific channel'),
    async execute(interaction) {

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
            return interaction.editReply("❌ You don't have permission.");
        }

        await interaction.deferReply({ ephemeral: true });

        const channelId = "1404009675627827270";
        const channel = await interaction.client.channels.fetch(channelId);

        if (!channel) {
            return interaction.editReply("❌ Channel not found!");
        }

        const embed = new EmbedBuilder()
            .setTitle("📜 Serverregeln – Bitte lesen!")
            .setDescription(
                "Durch das Betreten und Nutzen dieses Servers erklärst du dich mit den folgenden Regeln einverstanden.\n" +
                "⸻\n\n" +
                "✅ 1. Respektvoller Umgang\n\n" +
                "🤝 Behandle alle Mitglieder freundlich und respektvoll.\n" +
                "❌ Keine Beleidigungen, Provokationen, Rassismus, Sexismus oder Diskriminierung.\n" +
                "⸻\n\n" +
                "🚫 2. Kein Spam / Werbung\n\n" +
                "📵 Kein Spam (Text, Emojis, Capslock, Links, Bot-Spam).\n" +
                "📢 Werbung nur mit Genehmigung des Teams!\n\n" +
                "⸻\n\n" +
                "⚖️ 3. Keine illegalen oder unangemessenen Inhalte\n\n" +
                "❌ Keine Gewalt, Pornografie, Drogen, extremistischen Inhalte oder Urheberrechtsverletzungen.\n\n" +
                "⸻\n\n" +
                "👤 4. Namen & Profilbilder\n\n" +
                "🛑 Keine beleidigenden, anstößigen oder täuschenden Nicknames oder Avatare.\n" +
                "👮‍♂️ Nachahmung von Teammitgliedern = Bann!\n\n" +
                "⸻\n\n" +
                "🔊 5. Voice-Chat-Verhalten\n\n" +
                "🔇 Kein Schreien, Störgeräusche, Trolling oder Musik ohne Erlaubnis.\n" +
                "🎧 Push-to-Talk wird empfohlen!\n\n" +
                "⸻\n\n" +
                "🛑 6. Folge den Anweisungen des Teams\n\n" +
                "👮 Teammitglieder haben das letzte Wort.\n" +
                "📬 Diskussionen bitte ruhig und privat klären.\n\n" +
                "⸻\n\n" +
                "🔐 7. Datenschutz & Privatsphäre\n\n" +
                "🔒 Teile keine privaten Daten im Internet – auch nicht auf diesem Server.\n" +
                "⚠️ Wer persönliche Daten (z.B. Adresse, Telefonnummer, Schule, etc.) öffentlich teilt, tut dies auf eigene Verantwortung.\n" +
                "🛡️ Die wenigen Daten, die wir als Server erhalten (z. B. durch Tickets, Reports, Logs), werden nicht weitergegeben –\n" +
                "📂 außer in absoluten Notfällen, z.B. bei ernsthaften Gefahren oder bei einer offiziellen Anfrage durch die Polizei oder Behörden.\n\n" +
                "⸻\n\n" +
                "💘 8. Kein Dating / Keine sexuellen Inhalte\n\n" +
                "🚫 Dieser Server ist kein Dating-Server.\n" +
                "❌ Flirts, sexuelle Anspielungen, Anbaggern oder unangemessene Gespräche sind verboten.\n\n" +
                "⸻\n\n" +
                "💬 9. Kanalregeln beachten\n\n" +
                "📌 Nutze jeden Kanal nur für das vorgesehene Thema.\n" +
                "📖 Lies die Beschreibungen sorgfältig.\n\n" +
                "⸻\n\n" +
                "⚠️ 10. Keine Zweit- oder Fake-Accounts\n\n" +
                "❌ Zweitaccounts zum Umgehen von Banns oder Strafen = sofortiger Bann!\n" +
                "⸻\n\n" +
                "🤖 11. Bot-Nutzung\n\n" +
                "🤖 Nutze Bots nur in den dafür vorgesehenen Kanälen.\n" +
                "🧼 Kein Spammen mit Bot-Kommandos.\n\n" +
                "⸻\n\n" +
                "📹 12. Aufnahmen nur mit Zustimmung\n\n" +
                "🎙️ Voice-Aufnahmen sind nur mit Zustimmung aller Beteiligten erlaubt!\n\n" +
                "⸻\n\n" +
                "🧾 13. Tickets & Support\n\n" +
                "📩 Support nur bei echten Anliegen nutzen.\n" +
                "⏳ Bitte hab Geduld – das Team hilft dir so schnell es kann.\n\n" +
                "⸻\n\n" +
                "🎉 14. Events & Giveaways\n\n" +
                "🎁 Kein Betrug, keine Mehrfachteilnahmen.\n" +
                "📜 Zusätzliche Regeln werden jeweils bekanntgegeben.\n\n" +
                "⸻\n\n" +
                "🌍 15. Sprache auf dem Server\n\n" +
                "💬 Hauptsprache: Deutsch\n" +
                "🈚 Fremdsprachen bitte nur in passenden Kanälen.\n\n" +
                "⸻\n\n" +
                "🔞 16. Kein NSFW / 18+ Content\n\n" +
                "❌ Der Server ist jugendfrei. Inhalte ab 18 nur in verifizierten Bereichen (falls vorhanden).\n\n" +
                "⸻\n\n" +
                "📣 17. Melden statt provozieren\n\n" +
                "🚨 Melde Regelverstöße dem Team\n" +
                "🙅‍♂️ Selbstjustiz, Gegentrolling oder „Zurückbeleidigen“ ist ebenfalls strafbar.\n\n" +
                "⸻\n\n" +
                "🥳 18. Wichtigstes zum Schluss:\n\n" +
                "🎊 Hab Spaß!\n" +
                "🤗 Finde Freunde, chatte locker und genieße deine Zeit auf unserem Server!\n" +
                "👥 Wir möchten eine freundliche, sichere und offene Community für alle bieten.\n\n" +
                "⸻\n\n" +
                "👮‍♂️ Bei Fragen oder Problemen:\n\n" +
                "➡ Wende dich an das Team oder öffne ein Ticket!"
    )
            .setColor("#89CFF0")
            .setFooter({ text: "Hykaika Team" })
            .setAuthor({ name: interaction.client.user.username, iconURL: interaction.client.user.displayAvatarURL() });

        await channel.send({ embeds: [embed] });
        await interaction.editReply(`✅ Embed sent to ${channel}`);
    }
};
