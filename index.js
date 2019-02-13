#! /usr/bin/env node

const { is_valid_to_get_channel_id, get_channel_id } = require('vid_data');
const feedFinder = require('rss-finder');

const instruction =
`Usages:

    anyfeed <URL>
    anyFeed <URL>
    af      <URL>

Examples of supported format:

    af https://www.schneier.com/
    af https://www.jwz.org/blog/
    af https://www.youtube.com/watch?v=ZiXZsMIVGos
    af "https://www.youtube.com/watch?time_continue=212&v=ZiXZsMIVGos"
    af https://www.youtube.com/embed/ZiXZsMIVGos
    af https://www.youtube.com/channel/UC6ZFN9Tx6xh-skXCuRHCDpQ
    af https://youtu.be/ZiXZsMIVGos
    af https://www.youtube.com/user/PBSNewsHour

Above formatted URLs with additional path or parameters are also allowed
- For URLs with parameters or query, remember to put quotation around URL to
  prevent your terminal emulator or command line application errors

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
IN THE SOFTWARE.

Version 1.0.0
Send bug report here : https://github.com/dxwc/anyFeed/issues
`;

global.previous_length = 0;

function stdout_write(text)
{
    process.stdout.write
    (
        ' '.repeat(global.previous_length ? previous_length : text.length) + '\r'
    );

    global.previous_length = text.length;
    process.stdout.write(text + '\r');
}

const progress_text =
[
    `Just a second`,
    `Last step`,
    `One more step`,
    `Finishing up`,
    `Working on it`,
    `Processing`,
    `5..4..3..2..1`,
    `Fetching data`,
    `Almost done`,
    `Almost there`,
    `Loading`,
    `Getting data`,
    `Coming up next`,
    `Praying this works`,
    `Here goes nothing`
];

function rand_element()
{
    return progress_text[Math.floor(Math.random() * progress_text.length)] + '...';
}

const err_text =
`Could not find channel ID. Double check your URL and retry. If problem persists,
check internet connection, check --help text and consider submiting a bug report.`;

if(process.argv.length <= 2)
{
    console.error(instruction);
    process.exit(1);
}
else if(process.argv[2] === '--help' || process.argv[2] === '-h')
{
    console.info(instruction);
    process.exit(0);
}
else if(!is_valid_to_get_channel_id(process.argv[2]))
{
    stdout_write(rand_element());
    feedFinder(process.argv[2])
    .then((res) =>
    {
        stdout_write(``);
        if(!res.feedUrls || res.feedUrls.length === 0)
        {
            console.error(`No feed found`);
            process.exit(0);
        }

        res.feedUrls.forEach((feed) => console.log(feed.url));
        process.exit(0);
    })
    .catch((err) =>
    {
        console.error(err);
        process.exit(1);
    });
}
else
{
    Promise.resolve()
    .then(() =>
    {
        stdout_write(rand_element());
        return get_channel_id(process.argv[2], false, true);
    })
    .then((id) =>
    {
        if(id)
        {
            stdout_write(``);
            console.info(`https://www.youtube.com/feeds/videos.xml?channel_id=${id}`);
            return;
        }

        return console.error(err_text);
    })
    .catch((err) =>
    {
        console.error('Error: ', err);
        return console.error(err_text);
    });
}