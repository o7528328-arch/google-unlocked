$(function () {
    console.log("Google Unlocked: Active");

    // Look for the notice links
    const notices = $('a').filter(function() {
        const href = $(this).attr('href') || '';
        return href.includes('lumendatabase.org/notices/') || href.includes('chillingeffects.org/notice.cgi');
    });

    if (notices.length === 0) return;

    // Create results box
    if ($('#unlocked-box').length === 0) {
        $('#rcnt').append(`
            <div id="unlocked-box" style="margin:20px; padding:15px; border:1px solid #dadce0; border-radius:8px; background:#f8f9fa;">
                <h3 style="color:#1a0dab; margin-top:0;">🔓 Unlocked Results</h3>
                <div id="unlocked-content">Loading hidden links...</div>
            </div>
        `);
    }

    notices.each(function (i, el) {
        const href = $(el).attr('href');
        const idMatch = href.match(/sID=(\d+)/) || href.match(/notices\/(\d+)/);
        if (!idMatch) return;

        // DIRECT URL (no www) to avoid the redirect loop
        const targetUrl = `https://lumendatabase.org/notices/${idMatch[1]}`;

        setTimeout(() => {
            $.get(targetUrl, function(data) {
                // Regex to find domains and URL counts
                const regex = /class="infringing_url">([^<]+)\s*-\s*(\d+)/g;
                let match;
                let htmlOutput = "";

                while ((match = regex.exec(data)) !== null) {
                    htmlOutput += `<div style="margin:5px 0;">
                        <a href="http://${match[1].trim()}" target="_blank" style="text-decoration:none; font-weight:bold;">${match[1].trim()}</a> 
                        <span style="color:#70757a;">(${match[2]} links)</span>
                    </div>`;
                }
                
                if (i === 0) $('#unlocked-content').empty();
                $('#unlocked-content').append(htmlOutput);
            }).fail((err) => console.log("Lumen Fetch Error:", err));
        }, i * 2000);
    });
});
