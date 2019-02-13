A command line program to get RSS/Atom feed link given a URL. This also supports most YouTube links including video URLs. This is useful if you use a feed reader like newsboat that doesn't look up feed link given a site URL.

# Install

1. Have [Node.js](https://nodejs.org/en/) installed
2. Run command **`npm install -g anyfeed@latest`** and you are all set
    + To update to latest version anytime after installation, run:
      `npm update -g anyfeed`
    + To uninstall, run: `npm uninstall -g anyfeed`
    + _Unix may need `sudo` before commands_
    + _Windows may need running cmd as administrator_

# Use

+ `af <link>` and press enter
+ If the copied link looks odd, it's a good idea to put it in quote to not upset your
  terminal emulator or command line prompt like. Example :
    + `af "https://www.youtube.com/watch?time_continue=277&v=ZiXZsMIVGos"`
+ To view instruction or information, type and enter `af --help`
+ **Note**: The program will run the same with the names: `af`, `anyFeed` or `anyfeed`

# How

This combines [vidFeed](https://www.npmjs.com/package/vidfeed) and [rss-finder](https://www.npmjs.com/package/rss-finder)

---

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.