function ieCssFix() {
    var head = document.getElementsByTagName('head')[0],
        style = document.createElement('style');
    style.type = 'text/css';
    style.styleSheet.cssText = ':before,:after{content:none !important}';
    head.appendChild(style);
    setTimeout(function () {
        head.removeChild(style);
    }, 0);
}
function webGlFingerprint() {
    //WebGL fingerprinting
    //Code from https://github.com/Valve/fingerprintjs2
    try {
        var fa2s = function (fa) {
            gl.clearColor(0.0, 0.0, 0.0, 1.0);
            gl.enable(gl.DEPTH_TEST);
            gl.depthFunc(gl.LEQUAL);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            return "[" + fa[0] + ", " + fa[1] + "]";
        };
        var maxAnisotropy = function (gl) {
            var anisotropy, ext = gl.getExtension("EXT_texture_filter_anisotropic") || gl.getExtension("WEBKIT_EXT_texture_filter_anisotropic") || gl.getExtension("MOZ_EXT_texture_filter_anisotropic");
            return ext ? (anisotropy = gl.getParameter(ext.MAX_TEXTURE_MAX_ANISOTROPY_EXT), 0 === anisotropy && (anisotropy = 2), anisotropy) : null;
        };
        var canvas = document.createElement("canvas");
        var gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
        var result = [];
        var vShaderTemplate = "attribute vec2 attrVertex;varying vec2 varyinTexCoordinate;uniform vec2 uniformOffset;void main(){varyinTexCoordinate=attrVertex+uniformOffset;gl_Position=vec4(attrVertex,0,1);}";
        var fShaderTemplate = "precision mediump float;varying vec2 varyinTexCoordinate;void main() {gl_FragColor=vec4(varyinTexCoordinate,0,1);}";
        var vertexPosBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexPosBuffer);
        var vertices = new Float32Array([-.2, -.9, 0, .4, -.26, 0, 0, .732134444, 0]);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
        vertexPosBuffer.itemSize = 3;
        vertexPosBuffer.numItems = 3;
        var program = gl.createProgram(), vshader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(vshader, vShaderTemplate);
        gl.compileShader(vshader);
        var fshader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(fshader, fShaderTemplate);
        gl.compileShader(fshader);
        gl.attachShader(program, vshader);
        gl.attachShader(program, fshader);
        gl.linkProgram(program);
        gl.useProgram(program);
        program.vertexPosAttrib = gl.getAttribLocation(program, "attrVertex");
        program.offsetUniform = gl.getUniformLocation(program, "uniformOffset");
        gl.enableVertexAttribArray(program.vertexPosArray);
        gl.vertexAttribPointer(program.vertexPosAttrib, vertexPosBuffer.itemSize, gl.FLOAT, !1, 0, 0);
        gl.uniform2f(program.offsetUniform, 1, 1);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, vertexPosBuffer.numItems);
        if (gl.canvas != null) { result.push(gl.canvas.toDataURL()); }
        result.push("extensions:" + gl.getSupportedExtensions().join(";"));
        result.push("webgl aliased line width range:" + fa2s(gl.getParameter(gl.ALIASED_LINE_WIDTH_RANGE)));
        result.push("webgl aliased point size range:" + fa2s(gl.getParameter(gl.ALIASED_POINT_SIZE_RANGE)));
        result.push("webgl alpha bits:" + gl.getParameter(gl.ALPHA_BITS));
        result.push("webgl antialiasing:" + (gl.getContextAttributes().antialias ? "yes" : "no"));
        result.push("webgl blue bits:" + gl.getParameter(gl.BLUE_BITS));
        result.push("webgl depth bits:" + gl.getParameter(gl.DEPTH_BITS));
        result.push("webgl green bits:" + gl.getParameter(gl.GREEN_BITS));
        result.push("webgl max anisotropy:" + maxAnisotropy(gl));
        result.push("webgl max combined texture image units:" + gl.getParameter(gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS));
        result.push("webgl max cube map texture size:" + gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE));
        result.push("webgl max fragment uniform vectors:" + gl.getParameter(gl.MAX_FRAGMENT_UNIFORM_VECTORS));
        result.push("webgl max render buffer size:" + gl.getParameter(gl.MAX_RENDERBUFFER_SIZE));
        result.push("webgl max texture image units:" + gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS));
        result.push("webgl max texture size:" + gl.getParameter(gl.MAX_TEXTURE_SIZE));
        result.push("webgl max varying vectors:" + gl.getParameter(gl.MAX_VARYING_VECTORS));
        result.push("webgl max vertex attribs:" + gl.getParameter(gl.MAX_VERTEX_ATTRIBS));
        result.push("webgl max vertex texture image units:" + gl.getParameter(gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS));
        result.push("webgl max vertex uniform vectors:" + gl.getParameter(gl.MAX_VERTEX_UNIFORM_VECTORS));
        result.push("webgl max viewport dims:" + fa2s(gl.getParameter(gl.MAX_VIEWPORT_DIMS)));
        result.push("webgl red bits:" + gl.getParameter(gl.RED_BITS));
        result.push("webgl renderer:" + gl.getParameter(gl.RENDERER));
        result.push("webgl shading language version:" + gl.getParameter(gl.SHADING_LANGUAGE_VERSION));
        result.push("webgl stencil bits:" + gl.getParameter(gl.STENCIL_BITS));
        result.push("webgl vendor:" + gl.getParameter(gl.VENDOR));
        result.push("webgl version:" + gl.getParameter(gl.VERSION));
        result.push("webgl vertex shader high float precision:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_FLOAT).precision);
        result.push("webgl vertex shader high float precision rangeMin:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_FLOAT).rangeMin);
        result.push("webgl vertex shader high float precision rangeMax:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_FLOAT).rangeMax);
        result.push("webgl vertex shader medium float precision:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.MEDIUM_FLOAT).precision);
        result.push("webgl vertex shader medium float precision rangeMin:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.MEDIUM_FLOAT).rangeMin);
        result.push("webgl vertex shader medium float precision rangeMax:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.MEDIUM_FLOAT).rangeMax);
        result.push("webgl vertex shader low float precision:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.LOW_FLOAT).precision);
        result.push("webgl vertex shader low float precision rangeMin:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.LOW_FLOAT).rangeMin);
        result.push("webgl vertex shader low float precision rangeMax:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.LOW_FLOAT).rangeMax);
        result.push("webgl fragment shader high float precision:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT).precision);
        result.push("webgl fragment shader high float precision rangeMin:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT).rangeMin);
        result.push("webgl fragment shader high float precision rangeMax:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT).rangeMax);
        result.push("webgl fragment shader medium float precision:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_FLOAT).precision);
        result.push("webgl fragment shader medium float precision rangeMin:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_FLOAT).rangeMin);
        result.push("webgl fragment shader medium float precision rangeMax:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_FLOAT).rangeMax);
        result.push("webgl fragment shader low float precision:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.LOW_FLOAT).precision);
        result.push("webgl fragment shader low float precision rangeMin:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.LOW_FLOAT).rangeMin);
        result.push("webgl fragment shader low float precision rangeMax:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.LOW_FLOAT).rangeMax);
        result.push("webgl vertex shader high int precision:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_INT).precision);
        result.push("webgl vertex shader high int precision rangeMin:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_INT).rangeMin);
        result.push("webgl vertex shader high int precision rangeMax:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_INT).rangeMax);
        result.push("webgl vertex shader medium int precision:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.MEDIUM_INT).precision);
        result.push("webgl vertex shader medium int precision rangeMin:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.MEDIUM_INT).rangeMin);
        result.push("webgl vertex shader medium int precision rangeMax:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.MEDIUM_INT).rangeMax);
        result.push("webgl vertex shader low int precision:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.LOW_INT).precision);
        result.push("webgl vertex shader low int precision rangeMin:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.LOW_INT).rangeMin);
        result.push("webgl vertex shader low int precision rangeMax:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.LOW_INT).rangeMax);
        result.push("webgl fragment shader high int precision:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_INT).precision);
        result.push("webgl fragment shader high int precision rangeMin:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_INT).rangeMin);
        result.push("webgl fragment shader high int precision rangeMax:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_INT).rangeMax);
        result.push("webgl fragment shader medium int precision:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_INT).precision);
        result.push("webgl fragment shader medium int precision rangeMin:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_INT).rangeMin);
        result.push("webgl fragment shader medium int precision rangeMax:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_INT).rangeMax);
        result.push("webgl fragment shader low int precision:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.LOW_INT).precision);
        result.push("webgl fragment shader low int precision rangeMin:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.LOW_INT).rangeMin);
        result.push("webgl fragment shader low int precision rangeMax:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.LOW_INT).rangeMax);
        webGLData = result.join("§");

        canvas = document.createElement('canvas');
        var ctx = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
        if (ctx.getSupportedExtensions().indexOf("WEBGL_debug_renderer_info") >= 0) {
            webGLVendor = ctx.getParameter(ctx.getExtension('WEBGL_debug_renderer_info').UNMASKED_VENDOR_WEBGL);
            webGLRenderer = ctx.getParameter(ctx.getExtension('WEBGL_debug_renderer_info').UNMASKED_RENDERER_WEBGL);
        } else {
            webGLVendor = "Not supported";
            webGLRenderer = "Not supported";
        }
    } catch (e) {
        webGLData = "Not supported";
        webGLVendor = "Not supported";
        webGLRenderer = "Not supported";
    }

    return result;
}
function audioFingerprint() {
    var audioData = {};

    if ((window.AudioContext || window.webkitAudioContext) === undefined) {
        audioData = "Not supported";
    } else {
        // Performs fingerprint as found in https://client.a.pxi.pub/PXmssU3ZQ0/main.min.js
        //Sum of buffer values
        function run_pxi_fp() {
            try {
                if (context = new (window.OfflineAudioContext || window.webkitOfflineAudioContext)(1, 44100, 44100), !context) {
                    audioData.pxi_output = 0;
                }

                // Create oscillator
                pxi_oscillator = context.createOscillator();
                pxi_oscillator.type = "triangle";
                pxi_oscillator.frequency.value = 1e4;

                // Create and configure compressor
                pxi_compressor = context.createDynamicsCompressor();
                pxi_compressor.threshold && (pxi_compressor.threshold.value = -50);
                pxi_compressor.knee && (pxi_compressor.knee.value = 40);
                pxi_compressor.ratio && (pxi_compressor.ratio.value = 12);
                pxi_compressor.reduction && (pxi_compressor.reduction.value = -20);
                pxi_compressor.attack && (pxi_compressor.attack.value = 0);
                pxi_compressor.release && (pxi_compressor.release.value = .25);

                // Connect nodes
                pxi_oscillator.connect(pxi_compressor);
                pxi_compressor.connect(context.destination);

                // Start audio processing
                pxi_oscillator.start(0);
                context.startRendering();
                context.oncomplete = function (evnt) {
                    audioData.pxi_output = 0;
                    var sha1 = CryptoJS.algo.SHA1.create();
                    for (var i = 0; i < evnt.renderedBuffer.length; i++) {
                        sha1.update(evnt.renderedBuffer.getChannelData(0)[i].toString());
                    }
                    hash = sha1.finalize();
                    audioData.pxi_full_buffer_hash = hash.toString(CryptoJS.enc.Hex);
                    for (var i = 4500; 5e3 > i; i++) {
                        audioData.pxi_output += Math.abs(evnt.renderedBuffer.getChannelData(0)[i]);
                    }
                    pxi_compressor.disconnect();
                }
            } catch (u) {
                audioData.pxi_output = 0;
            }
        }

        // End PXI fingerprint

        // Performs fingerprint as found in some versions of http://metrics.nt.vc/metrics.js
        function a(a, b, c) {
            for (var d in b) "dopplerFactor" === d || "speedOfSound" === d || "currentTime" ===
                d || "number" !== typeof b[d] && "string" !== typeof b[d] || (a[(c ? c : "") + d] = b[d]);
            return a
        }

        function run_nt_vc_fp() {
            try {
                var nt_vc_context = window.AudioContext || window.webkitAudioContext;
                if ("function" !== typeof nt_vc_context) audioData.nt_vc_output = "Not available";
                else {
                    var f = new nt_vc_context,
                        d = f.createAnalyser();
                    audioData.nt_vc_output = a({}, f, "ac-");
                    audioData.nt_vc_output = a(audioData.nt_vc_output, f.destination, "ac-");
                    audioData.nt_vc_output = a(audioData.nt_vc_output, f.listener, "ac-");
                    audioData.nt_vc_output = a(audioData.nt_vc_output, d, "an-");
                }
            } catch (g) {
                audioData.nt_vc_output = 0
            }
        }

        // Performs fingerprint as found in https://www.cdn-net.com/cc.js
        var cc_output = [];

        function run_cc_fp() {
            var audioCtx = new (window.AudioContext || window.webkitAudioContext),
                oscillator = audioCtx.createOscillator(),
                analyser = audioCtx.createAnalyser(),
                gain = audioCtx.createGain(),
                scriptProcessor = audioCtx.createScriptProcessor(4096, 1, 1);


            gain.gain.value = 0; // Disable volume
            oscillator.type = "triangle"; // Set oscillator to output triangle wave
            oscillator.connect(analyser); // Connect oscillator output to analyser input
            analyser.connect(scriptProcessor); // Connect analyser output to scriptProcessor input
            scriptProcessor.connect(gain); // Connect scriptProcessor output to gain input
            gain.connect(audioCtx.destination); // Connect gain output to audiocontext destination

            scriptProcessor.onaudioprocess = function (bins) {
                bins = new Float32Array(analyser.frequencyBinCount);
                analyser.getFloatFrequencyData(bins);
                for (var i = 0; i < bins.length; i = i + 1) {
                    cc_output.push(bins[i]);
                }
                analyser.disconnect();
                scriptProcessor.disconnect();
                gain.disconnect();
                audioData.cc_output = cc_output.slice(0, 30);
            };

            oscillator.start(0);
        }

        // Performs a hybrid of cc/pxi methods found above
        var hybrid_output = [];

        function run_hybrid_fp() {
            var audioCtx = new (window.AudioContext || window.webkitAudioContext),
                oscillator = audioCtx.createOscillator(),
                analyser = audioCtx.createAnalyser(),
                gain = audioCtx.createGain(),
                scriptProcessor = audioCtx.createScriptProcessor(4096, 1, 1);

            // Create and configure compressor
            compressor = audioCtx.createDynamicsCompressor();
            compressor.threshold && (compressor.threshold.value = -50);
            compressor.knee && (compressor.knee.value = 40);
            compressor.ratio && (compressor.ratio.value = 12);
            compressor.reduction && (compressor.reduction.value = -20);
            compressor.attack && (compressor.attack.value = 0);
            compressor.release && (compressor.release.value = .25);

            gain.gain.value = 0; // Disable volume
            oscillator.type = "triangle"; // Set oscillator to output triangle wave
            oscillator.connect(compressor); // Connect oscillator output to dynamic compressor
            compressor.connect(analyser); // Connect compressor to analyser
            analyser.connect(scriptProcessor); // Connect analyser output to scriptProcessor input
            scriptProcessor.connect(gain); // Connect scriptProcessor output to gain input
            gain.connect(audioCtx.destination); // Connect gain output to audiocontext destination

            scriptProcessor.onaudioprocess = function (bins) {
                bins = new Float32Array(analyser.frequencyBinCount);
                analyser.getFloatFrequencyData(bins);
                for (var i = 0; i < bins.length; i = i + 1) {
                    hybrid_output.push(bins[i]);
                }
                analyser.disconnect();
                scriptProcessor.disconnect();
                gain.disconnect();

                audioData.hybrid_output = hybrid_output.slice(0, 30);
            };

            oscillator.start(0);
        }

        run_pxi_fp();
        run_nt_vc_fp();
        run_cc_fp();
        run_hybrid_fp();
    }
    return audioData;
}
function getPlugins() {
    return Array.from(navigator.plugins)
        .map((plugin) => `${plugin.name} - ${plugin.filename} - ${plugin.description}`)
        .join(", ");
}
function getPlatform() {
    return navigator.platform;
}
function getUserAgent() {
    return navigator.userAgent;
}
function getDevicePixelRatio() {
    return window.devicePixelRatio;
}
async function getHeaders() {
    let response = await fetch("https://httpbin.org/headers");
    let { headers } = await response.json();
    return ["Accept", "Accept-Encoding", "Accept-Language", "User-Agent"]
        .map((key) => `${key}: ${headers[key]}`)
        .join("\n");
}
function getDateFormat() {
    return new Date(0).toString();
}
// https://gist.github.com/oyiptong/ae63f55702b84fee4fe710ed57db9715
function getFonts() {
    var fonts = [".Aqua Kana", ".Helvetica LT MM", ".Times LT MM", "18thCentury", "8514oem", "AR BERKLEY", "AR JULIAN", "AR PL UKai CN", "AR PL UMing CN", "AR PL UMing HK", "AR PL UMing TW", "AR PL UMing TW MBE", "Aakar", "Abadi MT Condensed Extra Bold", "Abadi MT Condensed Light", "Abyssinica SIL", "AcmeFont", "Adobe Arabic", "Agency FB", "Aharoni", "Aharoni Bold", "Al Bayan", "Al Bayan Bold", "Al Bayan Plain", "Al Nile", "Al Tarikh", "Aldhabi", "Alfredo", "Algerian", "Alien Encounters", "Almonte Snow", "American Typewriter", "American Typewriter Bold", "American Typewriter Condensed", "American Typewriter Light", "Amethyst", "Andale Mono", "Andale Mono Version", "Andalus", "Angsana New", "AngsanaUPC", "Ani", "AnjaliOldLipi", "Aparajita", "Apple Braille", "Apple Braille Outline 6 Dot", "Apple Braille Outline 8 Dot", "Apple Braille Pinpoint 6 Dot", "Apple Braille Pinpoint 8 Dot", "Apple Chancery", "Apple Color Emoji", "Apple LiGothic Medium", "Apple LiSung Light", "Apple SD Gothic Neo", "Apple SD Gothic Neo Regular", "Apple SD GothicNeo ExtraBold", "Apple Symbols", "AppleGothic", "AppleGothic Regular", "AppleMyungjo", "AppleMyungjo Regular", "AquaKana", "Arabic Transparent", "Arabic Typesetting", "Arial", "Arial Baltic", "Arial Black", "Arial Bold", "Arial Bold Italic", "Arial CE", "Arial CYR", "Arial Greek", "Arial Hebrew", "Arial Hebrew Bold", "Arial Italic", "Arial Narrow", "Arial Narrow Bold", "Arial Narrow Bold Italic", "Arial Narrow Italic", "Arial Rounded Bold", "Arial Rounded MT Bold", "Arial TUR", "Arial Unicode MS", "ArialHB", "Arimo", "Asimov", "Autumn", "Avenir", "Avenir Black", "Avenir Book", "Avenir Next", "Avenir Next Bold", "Avenir Next Condensed", "Avenir Next Condensed Bold", "Avenir Next Demi Bold", "Avenir Next Heavy", "Avenir Next Regular", "Avenir Roman", "Ayuthaya", "BN Jinx", "BN Machine", "BOUTON International Symbols", "Baby Kruffy", "Baghdad", "Bahnschrift", "Balthazar", "Bangla MN", "Bangla MN Bold", "Bangla Sangam MN", "Bangla Sangam MN Bold", "Baskerville", "Baskerville Bold", "Baskerville Bold Italic", "Baskerville Old Face", "Baskerville SemiBold", "Baskerville SemiBold Italic", "Bastion", "Batang", "BatangChe", "Bauhaus 93", "Beirut", "Bell MT", "Bell MT Bold", "Bell MT Italic", "Bellerose", "Berlin Sans FB", "Berlin Sans FB Demi", "Bernard MT Condensed", "BiauKai", "Big Caslon", "Big Caslon Medium", "Birch Std", "Bitstream Charter", "Bitstream Vera Sans", "Blackadder ITC", "Blackoak Std", "Bobcat", "Bodoni 72", "Bodoni MT", "Bodoni MT Black", "Bodoni MT Poster Compressed", "Bodoni Ornaments", "BolsterBold", "Book Antiqua", "Book Antiqua Bold", "Bookman Old Style", "Bookman Old Style Bold", "Bookshelf Symbol 7", "Borealis", "Bradley Hand", "Bradley Hand ITC", "Braggadocio", "Brandish", "Britannic Bold", "Broadway", "Browallia New", "BrowalliaUPC", "Brush Script", "Brush Script MT", "Brush Script MT Italic", "Brush Script Std", "Brussels", "Calibri", "Calibri Bold", "Calibri Light", "Californian FB", "Calisto MT", "Calisto MT Bold", "Calligraphic", "Calvin", "Cambria", "Cambria Bold", "Cambria Math", "Candara", "Candara Bold", "Candles", "Carrois Gothic SC", "Castellar", "Centaur", "Century", "Century Gothic", "Century Gothic Bold", "Century Schoolbook", "Century Schoolbook Bold", "Century Schoolbook L", "Chalkboard", "Chalkboard Bold", "Chalkboard SE", "Chalkboard SE Bold", "ChalkboardBold", "Chalkduster", "Chandas", "Chaparral Pro", "Chaparral Pro Light", "Charlemagne Std", "Charter", "Chilanka", "Chiller", "Chinyen", "Clarendon", "Cochin", "Cochin Bold", "Colbert", "Colonna MT", "Comic Sans MS", "Comic Sans MS Bold", "Commons", "Consolas", "Consolas Bold", "Constantia", "Constantia Bold", "Coolsville", "Cooper Black", "Cooper Std Black", "Copperplate", "Copperplate Bold", "Copperplate Gothic Bold", "Copperplate Light", "Corbel", "Corbel Bold", "Cordia New", "CordiaUPC", "Corporate", "Corsiva", "Corsiva Hebrew", "Corsiva Hebrew Bold", "Courier", "Courier 10 Pitch", "Courier Bold", "Courier New", "Courier New Baltic", "Courier New Bold", "Courier New CE", "Courier New Italic", "Courier Oblique", "Cracked Johnnie", "Creepygirl", "Curlz MT", "Cursor", "Cutive Mono", "DFKai-SB", "DIN Alternate", "DIN Condensed", "Damascus", "Damascus Bold", "Dancing Script", "DaunPenh", "David", "Dayton", "DecoType Naskh", "Deja Vu", "DejaVu LGC Sans", "DejaVu Sans", "DejaVu Sans Mono", "DejaVu Serif", "Deneane", "Desdemona", "Detente", "Devanagari MT", "Devanagari MT Bold", "Devanagari Sangam MN", "Didot", "Didot Bold", "Digifit", "DilleniaUPC", "Dingbats", "Distant Galaxy", "Diwan Kufi", "Diwan Kufi Regular", "Diwan Thuluth", "Diwan Thuluth Regular", "DokChampa", "Dominican", "Dotum", "DotumChe", "Droid Sans", "Droid Sans Fallback", "Droid Sans Mono", "Dyuthi", "Ebrima", "Edwardian Script ITC", "Elephant", "Emmett", "Engravers MT", "Engravers MT Bold", "Enliven", "Eras Bold ITC", "Estrangelo Edessa", "Ethnocentric", "EucrosiaUPC", "Euphemia", "Euphemia UCAS", "Euphemia UCAS Bold", "Eurostile", "Eurostile Bold", "Expressway Rg", "FangSong", "Farah", "Farisi", "Felix Titling", "Fingerpop", "Fixedsys", "Flubber", "Footlight MT Light", "Forte", "FrankRuehl", "Frankfurter Venetian TT", "Franklin Gothic Book", "Franklin Gothic Book Italic", "Franklin Gothic Medium", "Franklin Gothic Medium Cond", "Franklin Gothic Medium Italic", "FreeMono", "FreeSans", "FreeSerif", "FreesiaUPC", "Freestyle Script", "French Script MT", "Futura", "Futura Condensed ExtraBold", "Futura Medium", "GB18030 Bitmap", "Gabriola", "Gadugi", "Garamond", "Garamond Bold", "Gargi", "Garuda", "Gautami", "Gazzarelli", "Geeza Pro", "Geeza Pro Bold", "Geneva", "GenevaCY", "Gentium", "Gentium Basic", "Gentium Book Basic", "GentiumAlt", "Georgia", "Georgia Bold", "Geotype TT", "Giddyup Std", "Gigi", "Gill", "Gill Sans", "Gill Sans Bold", "Gill Sans MT", "Gill Sans MT Bold", "Gill Sans MT Condensed", "Gill Sans MT Ext Condensed Bold", "Gill Sans MT Italic", "Gill Sans Ultra Bold", "Gill Sans Ultra Bold Condensed", "Gisha", "Glockenspiel", "Gloucester MT Extra Condensed", "Good Times", "Goudy", "Goudy Old Style", "Goudy Old Style Bold", "Goudy Stout", "Greek Diner Inline TT", "Gubbi", "Gujarati MT", "Gujarati MT Bold", "Gujarati Sangam MN", "Gujarati Sangam MN Bold", "Gulim", "GulimChe", "GungSeo Regular", "Gungseouche", "Gungsuh", "GungsuhChe", "Gurmukhi", "Gurmukhi MN", "Gurmukhi MN Bold", "Gurmukhi MT", "Gurmukhi Sangam MN", "Gurmukhi Sangam MN Bold", "Haettenschweiler", "Hand Me Down S (BRK)", "Hansen", "Harlow Solid Italic", "Harrington", "Harvest", "HarvestItal", "Haxton Logos TT", "HeadLineA Regular", "HeadlineA", "Heavy Heap", "Hei", "Hei Regular", "Heiti SC", "Heiti SC Light", "Heiti SC Medium", "Heiti TC", "Heiti TC Light", "Heiti TC Medium", "Helvetica", "Helvetica Bold", "Helvetica CY Bold", "Helvetica CY Plain", "Helvetica LT Std", "Helvetica Light", "Helvetica Neue", "Helvetica Neue Bold", "Helvetica Neue Medium", "Helvetica Oblique", "HelveticaCY", "HelveticaNeueLT Com 107 XBlkCn", "Herculanum", "High Tower Text", "Highboot", "Hiragino Kaku Gothic Pro W3", "Hiragino Kaku Gothic Pro W6", "Hiragino Kaku Gothic ProN W3", "Hiragino Kaku Gothic ProN W6", "Hiragino Kaku Gothic Std W8", "Hiragino Kaku Gothic StdN W8", "Hiragino Maru Gothic Pro W4", "Hiragino Maru Gothic ProN W4", "Hiragino Mincho Pro W3", "Hiragino Mincho Pro W6", "Hiragino Mincho ProN W3", "Hiragino Mincho ProN W6", "Hiragino Sans GB W3", "Hiragino Sans GB W6", "Hiragino Sans W0", "Hiragino Sans W1", "Hiragino Sans W2", "Hiragino Sans W3", "Hiragino Sans W4", "Hiragino Sans W5", "Hiragino Sans W6", "Hiragino Sans W7", "Hiragino Sans W8", "Hiragino Sans W9", "Hobo Std", "Hoefler Text", "Hoefler Text Black", "Hoefler Text Ornaments", "Hollywood Hills", "Hombre", "Huxley Titling", "ITC Stone Serif", "ITF Devanagari", "ITF Devanagari Marathi", "ITF Devanagari Medium", "Impact", "Imprint MT Shadow", "InaiMathi", "Induction", "Informal Roman", "Ink Free", "IrisUPC", "Iskoola Pota", "Italianate", "Jamrul", "JasmineUPC", "Javanese Text", "Jokerman", "Juice ITC", "KacstArt", "KacstBook", "KacstDecorative", "KacstDigital", "KacstFarsi", "KacstLetter", "KacstNaskh", "KacstOffice", "KacstOne", "KacstPen", "KacstPoster", "KacstQurn", "KacstScreen", "KacstTitle", "KacstTitleL", "Kai", "Kai Regular", "KaiTi", "Kailasa", "Kailasa Regular", "Kaiti SC", "Kaiti SC Black", "Kalapi", "Kalimati", "Kalinga", "Kannada MN", "Kannada MN Bold", "Kannada Sangam MN", "Kannada Sangam MN Bold", "Kartika", "Karumbi", "Kedage", "Kefa", "Kefa Bold", "Keraleeyam", "Keyboard", "Khmer MN", "Khmer MN Bold", "Khmer OS", "Khmer OS System", "Khmer Sangam MN", "Khmer UI", "Kinnari", "Kino MT", "KodchiangUPC", "Kohinoor Bangla", "Kohinoor Devanagari", "Kohinoor Telugu", "Kokila", "Kokonor", "Kokonor Regular", "Kozuka Gothic Pr6N B", "Kristen ITC", "Krungthep", "KufiStandardGK", "KufiStandardGK Regular", "Kunstler Script", "Laksaman", "Lao MN", "Lao Sangam MN", "Lao UI", "LastResort", "Latha", "Leelawadee", "Letter Gothic Std", "LetterOMatic!", "Levenim MT", "LiHei Pro", "LiSong Pro", "Liberation Mono", "Liberation Sans", "Liberation Sans Narrow", "Liberation Serif", "Likhan", "LilyUPC", "Limousine", "Lithos Pro Regular", "LittleLordFontleroy", "Lohit Assamese", "Lohit Bengali", "Lohit Devanagari", "Lohit Gujarati", "Lohit Gurmukhi", "Lohit Hindi", "Lohit Kannada", "Lohit Malayalam", "Lohit Odia", "Lohit Punjabi", "Lohit Tamil", "Lohit Tamil Classical", "Lohit Telugu", "Loma", "Lucida Blackletter", "Lucida Bright", "Lucida Bright Demibold", "Lucida Bright Demibold Italic", "Lucida Bright Italic", "Lucida Calligraphy", "Lucida Calligraphy Italic", "Lucida Console", "Lucida Fax", "Lucida Fax Demibold", "Lucida Fax Regular", "Lucida Grande", "Lucida Grande Bold", "Lucida Handwriting", "Lucida Handwriting Italic", "Lucida Sans", "Lucida Sans Demibold Italic", "Lucida Sans Typewriter", "Lucida Sans Typewriter Bold", "Lucida Sans Unicode", "Luminari", "Luxi Mono", "MS Gothic", "MS Mincho", "MS Outlook", "MS PGothic", "MS PMincho", "MS Reference Sans Serif", "MS Reference Specialty", "MS Sans Serif", "MS Serif", "MS UI Gothic", "MT Extra", "MV Boli", "Mael", "Magneto", "Maiandra GD", "Malayalam MN", "Malayalam MN Bold", "Malayalam Sangam MN", "Malayalam Sangam MN Bold", "Malgun Gothic", "Mallige", "Mangal", "Manorly", "Marion", "Marion Bold", "Marker Felt", "Marker Felt Thin", "Marlett", "Martina", "Matura MT Script Capitals", "Meera", "Meiryo", "Meiryo Bold", "Meiryo UI", "MelodBold", "Menlo", "Menlo Bold", "Mesquite Std", "Microsoft", "Microsoft Himalaya", "Microsoft JhengHei", "Microsoft JhengHei UI", "Microsoft New Tai Lue", "Microsoft PhagsPa", "Microsoft Sans Serif", "Microsoft Tai Le", "Microsoft Tai Le Bold", "Microsoft Uighur", "Microsoft YaHei", "Microsoft YaHei UI", "Microsoft Yi Baiti", "Minerva", "MingLiU", "MingLiU-ExtB", "MingLiU_HKSCS", "Minion Pro", "Miriam", "Mishafi", "Mishafi Gold", "Mistral", "Modern", "Modern No. 20", "Monaco", "Mongolian Baiti", "Monospace", "Monotype Corsiva", "Monotype Sorts", "MoolBoran", "Moonbeam", "MotoyaLMaru", "Mshtakan", "Mshtakan Bold", "Mukti Narrow", "Muna", "Myanmar MN", "Myanmar MN Bold", "Myanmar Sangam MN", "Myanmar Text", "Mycalc", "Myriad Arabic", "Myriad Hebrew", "Myriad Pro", "NISC18030", "NSimSun", "Nadeem", "Nadeem Regular", "Nakula", "Nanum Barun Gothic", "Nanum Gothic", "Nanum Myeongjo", "NanumBarunGothic", "NanumGothic", "NanumGothic Bold", "NanumGothicCoding", "NanumMyeongjo", "NanumMyeongjo Bold", "Narkisim", "Nasalization", "Navilu", "Neon Lights", "New Peninim MT", "New Peninim MT Bold", "News Gothic MT", "News Gothic MT Bold", "Niagara Engraved", "Niagara Solid", "Nimbus Mono L", "Nimbus Roman No9 L", "Nimbus Sans L", "Nimbus Sans L Condensed", "Nina", "Nirmala UI", "Nirmala.ttf", "Norasi", "Noteworthy", "Noteworthy Bold", "Noto Color Emoji", "Noto Emoji", "Noto Mono", "Noto Naskh Arabic", "Noto Nastaliq Urdu", "Noto Sans", "Noto Sans Armenian", "Noto Sans Bengali", "Noto Sans CJK", "Noto Sans Canadian Aboriginal", "Noto Sans Cherokee", "Noto Sans Devanagari", "Noto Sans Ethiopic", "Noto Sans Georgian", "Noto Sans Gujarati", "Noto Sans Gurmukhi", "Noto Sans Hebrew", "Noto Sans JP", "Noto Sans KR", "Noto Sans Kannada", "Noto Sans Khmer", "Noto Sans Lao", "Noto Sans Malayalam", "Noto Sans Myanmar", "Noto Sans Oriya", "Noto Sans SC", "Noto Sans Sinhala", "Noto Sans Symbols", "Noto Sans TC", "Noto Sans Tamil", "Noto Sans Telugu", "Noto Sans Thai", "Noto Sans Yi", "Noto Serif", "Notram", "November", "Nueva Std", "Nueva Std Cond", "Nyala", "OCR A Extended", "OCR A Std", "Old English Text MT", "OldeEnglish", "Onyx", "OpenSymbol", "OpineHeavy", "Optima", "Optima Bold", "Optima Regular", "Orator Std", "Oriya MN", "Oriya MN Bold", "Oriya Sangam MN", "Oriya Sangam MN Bold", "Osaka", "Osaka-Mono", "OsakaMono", "PCMyungjo Regular", "PCmyoungjo", "PMingLiU", "PMingLiU-ExtB", "PR Celtic Narrow", "PT Mono", "PT Sans", "PT Sans Bold", "PT Sans Caption Bold", "PT Sans Narrow Bold", "PT Serif", "Padauk", "Padauk Book", "Padmaa", "Pagul", "Palace Script MT", "Palatino", "Palatino Bold", "Palatino Linotype", "Palatino Linotype Bold", "Papyrus", "Papyrus Condensed", "Parchment", "Parry Hotter", "PenultimateLight", "Perpetua", "Perpetua Bold", "Perpetua Titling MT", "Perpetua Titling MT Bold", "Phetsarath OT", "Phosphate", "Phosphate Inline", "Phosphate Solid", "PhrasticMedium", "PilGi Regular", "Pilgiche", "PingFang HK", "PingFang SC", "PingFang TC", "Pirate", "Plantagenet Cherokee", "Playbill", "Poor Richard", "Poplar Std", "Pothana2000", "Prestige Elite Std", "Pristina", "Purisa", "QuiverItal", "Raanana", "Raanana Bold", "Raavi", "Rachana", "Rage Italic", "RaghuMalayalam", "Ravie", "Rekha", "Roboto", "Rockwell", "Rockwell Bold", "Rockwell Condensed", "Rockwell Extra Bold", "Rockwell Italic", "Rod", "Roland", "Rondalo", "Rosewood Std Regular", "RowdyHeavy", "Russel Write TT", "SF Movie Poster", "STFangsong", "STHeiti", "STIXGeneral", "STIXGeneral-Bold", "STIXGeneral-Regular", "STIXIntegralsD", "STIXIntegralsD-Bold", "STIXIntegralsSm", "STIXIntegralsSm-Bold", "STIXIntegralsUp", "STIXIntegralsUp-Bold", "STIXIntegralsUp-Regular", "STIXIntegralsUpD", "STIXIntegralsUpD-Bold", "STIXIntegralsUpD-Regular", "STIXIntegralsUpSm", "STIXIntegralsUpSm-Bold", "STIXNonUnicode", "STIXNonUnicode-Bold", "STIXSizeFiveSym", "STIXSizeFiveSym-Regular", "STIXSizeFourSym", "STIXSizeFourSym-Bold", "STIXSizeOneSym", "STIXSizeOneSym-Bold", "STIXSizeThreeSym", "STIXSizeThreeSym-Bold", "STIXSizeTwoSym", "STIXSizeTwoSym-Bold", "STIXVariants", "STIXVariants-Bold", "STKaiti", "STSong", "STXihei", "SWGamekeys MT", "Saab", "Sahadeva", "Sakkal Majalla", "Salina", "Samanata", "Samyak Devanagari", "Samyak Gujarati", "Samyak Malayalam", "Samyak Tamil", "Sana", "Sana Regular", "Sans", "Sarai", "Sathu", "Savoye LET Plain:1.0", "Sawasdee", "Script", "Script MT Bold", "Segoe MDL2 Assets", "Segoe Print", "Segoe Pseudo", "Segoe Script", "Segoe UI", "Segoe UI Emoji", "Segoe UI Historic", "Segoe UI Semilight", "Segoe UI Symbol", "Serif", "Shonar Bangla", "Showcard Gothic", "Shree Devanagari 714", "Shruti", "SignPainter-HouseScript", "Silom", "SimHei", "SimSun", "SimSun-ExtB", "Simplified Arabic", "Simplified Arabic Fixed", "Sinhala MN", "Sinhala MN Bold", "Sinhala Sangam MN", "Sinhala Sangam MN Bold", "Sitka", "Skia", "Skia Regular", "Skinny", "Small Fonts", "Snap ITC", "Snell Roundhand", "Snowdrift", "Songti SC", "Songti SC Black", "Songti TC", "Source Code Pro", "Splash", "Standard Symbols L", "Stencil", "Stencil Std", "Stephen", "Sukhumvit Set", "Suruma", "Sylfaen", "Symbol", "Symbole", "System", "System Font", "TAMu_Kadambri", "TAMu_Kalyani", "TAMu_Maduram", "TSCu_Comic", "TSCu_Paranar", "TSCu_Times", "Tahoma", "Tahoma Negreta", "TakaoExGothic", "TakaoExMincho", "TakaoGothic", "TakaoMincho", "TakaoPGothic", "TakaoPMincho", "Tamil MN", "Tamil MN Bold", "Tamil Sangam MN", "Tamil Sangam MN Bold", "Tarzan", "Tekton Pro", "Tekton Pro Cond", "Tekton Pro Ext", "Telugu MN", "Telugu MN Bold", "Telugu Sangam MN", "Telugu Sangam MN Bold", "Tempus Sans ITC", "Terminal", "Terminator Two", "Thonburi", "Thonburi Bold", "Tibetan Machine Uni", "Times", "Times Bold", "Times New Roman", "Times New Roman Baltic", "Times New Roman Bold", "Times New Roman Italic", "Times Roman", "Tlwg Mono", "Tlwg Typewriter", "Tlwg Typist", "Tlwg Typo", "TlwgMono", "TlwgTypewriter", "Toledo", "Traditional Arabic", "Trajan Pro", "Trattatello", "Trebuchet MS", "Trebuchet MS Bold", "Tunga", "Tw Cen MT", "Tw Cen MT Bold", "Tw Cen MT Italic", "URW Bookman L", "URW Chancery L", "URW Gothic L", "URW Palladio L", "Ubuntu", "Ubuntu Condensed", "Ubuntu Mono", "Ukai", "Ume Gothic", "Ume Mincho", "Ume P Gothic", "Ume P Mincho", "Ume UI Gothic", "Uming", "Umpush", "UnBatang", "UnDinaru", "UnDotum", "UnGraphic", "UnGungseo", "UnPilgi", "Untitled1", "Urdu Typesetting", "Uroob", "Utkal", "Utopia", "Utsaah", "Valken", "Vani", "Vemana2000", "Verdana", "Verdana Bold", "Vijaya", "Viner Hand ITC", "Vivaldi", "Vivian", "Vladimir Script", "Vrinda", "Waree", "Waseem", "Waverly", "Webdings", "WenQuanYi Bitmap Song", "WenQuanYi Micro Hei", "WenQuanYi Micro Hei Mono", "WenQuanYi Zen Hei", "Whimsy TT", "Wide Latin", "Wingdings", "Wingdings 2", "Wingdings 3", "Woodcut", "X-Files", "Year supply of fairy cakes", "Yu Gothic", "Yu Mincho", "Yuppy SC", "Yuppy SC Regular", "Yuppy TC", "Yuppy TC Regular", "Zapf Dingbats", "Zapfino", "Zawgyi-One", "gargi", "lklug", "mry_KacstQurn", "ori1Uni"];
    return fonts
        .filter((font) => document.fonts.check(`12px "${font}"`))
        .join(", ");
}
function canvasFingerprint() {
    let canvas, canvasData;
    try {
        canvas = document.createElement("canvas");
        canvas.height = 60;
        canvas.width = 400;
        canvasContext = canvas.getContext("2d");
        canvas.style.display = "inline";
        canvasContext.textBaseline = "alphabetic";
        canvasContext.fillStyle = "#f60";
        canvasContext.fillRect(125, 1, 62, 20);
        canvasContext.fillStyle = "#069";
        canvasContext.font = "11pt no-real-font-123";
        canvasContext.fillText("Cwm fjordbank glyphs vext quiz, \ud83d\ude03", 2, 15);
        canvasContext.fillStyle = "rgba(102, 204, 0, 0.7)";
        canvasContext.font = "18pt Arial";
        canvasContext.fillText("Cwm fjordbank glyphs vext quiz, \ud83d\ude03", 4, 45);
        canvasData = canvas.toDataURL();
    } catch (e) {
        canvasData = "Not supported";
    }
    return canvasData;
}
function getCanvas2dRender() {
    let canvas = document.createElement("canvas");
    canvas.width = 200;
    canvas.height = 50;

    let ctx = canvas.getContext("2d");

    ctx.font = "21.5px Arial";
    ctx.fillText("😉", 0, 20);

    ctx.font = "15.7px serif";
    ctx.fillText("abcdefghijklmnopqrtsuvwxyz", 0, 40);

    ctx.font = "20.5px Arial";
    let gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, "red");
    gradient.addColorStop(0.5, "green");
    gradient.addColorStop(1.0, "blue");
    ctx.fillStyle = gradient;
    ctx.fillText("Lorem ipsum!", 30, 20);

    ctx.beginPath();
    ctx.moveTo(170, 5);
    ctx.lineTo(160, 25);
    ctx.lineTo(185, 20);
    ctx.fill();

    return canvas.toDataURL();
}
function generateTheAudioFingerPrint() {

    var context = null;
    var currentTime = null;
    var oscillator = null;
    var compressor = null;
    var fingerprint = null;
    var callback = null

    function run(cb, debug = false) {

        callback = cb;

        try {

            setup();

            oscillator.connect(compressor);
            compressor.connect(context.destination);

            oscillator.start(0);
            context.startRendering();

            context.oncomplete = onComplete;

        } catch (e) {

            if (debug) {
                throw e;
            }

        }
    }

    function setup() {
        setContext();
        currentTime = context.currentTime;
        setOscillator();
        setCompressor();
    }

    function setContext() {
        var audioContext = window.OfflineAudioContext || window.webkitOfflineAudioContext;
        context = new audioContext(1, 44100, 44100);
    }

    function setOscillator() {
        oscillator = context.createOscillator();
        oscillator.type = "triangle";
        oscillator.frequency.setValueAtTime(10000, currentTime);
    }

    function setCompressor() {
        compressor = context.createDynamicsCompressor();

        setCompressorValueIfDefined('threshold', -50);
        setCompressorValueIfDefined('knee', 40);
        setCompressorValueIfDefined('ratio', 12);
        setCompressorValueIfDefined('reduction', -20);
        setCompressorValueIfDefined('attack', 0);
        setCompressorValueIfDefined('release', .25);
    }

    function setCompressorValueIfDefined(item, value) {
        if (compressor[item] !== undefined && typeof compressor[item].setValueAtTime === 'function') {
            compressor[item].setValueAtTime(value, context.currentTime);
        }
    }

    function onComplete(event) {
        generateFingerprints(event);
        compressor.disconnect();
    }

    function generateFingerprints(event) {
        var output = null;
        for (var i = 4500; 5e3 > i; i++) {

            var channelData = event.renderedBuffer.getChannelData(0)[i];
            output += Math.abs(channelData);

        }

        fingerprint = output.toString();

        if (typeof callback === 'function') {
            return callback(fingerprint);
        }
    }

    return {
        run: run
    };

}
// fingerprinting happens here
async function fingerPrintJS() {
    let webGl, audio, fonts, date;
    let plugins, userAgent, canvas;
    let platform, devicePixelRatio, headers, broprintAudio
    try { webGl = webGlFingerprint() } catch (err) { }
    try { audio = audioFingerprint() } catch (err) { }
    try { fonts = getFonts() } catch (err) { }
    try { plugins = getPlugins() } catch (err) { }
    try { date = getDateFormat() } catch (err) { }
    try { userAgent = getUserAgent() } catch (err) { }
    try { platform = getPlatform() } catch (err) { }
    try { devicePixelRatio = getDevicePixelRatio() } catch (err) { }
    //try{headers=await getHeaders()}catch(err){} // https://httpbin.org/headers
    try { canvas = [canvasFingerprint(), getCanvas2dRender()] } catch (err) { }
    // try{broprintAudio=generateTheAudioFingerPrint().run()}catch(err){}
    // generateTheAudioFingerPrint().run(console.log)
    const data = {
        systemData: {
            webGl,
            audio,
            fonts,
            date
        },
        browserData: {
            plugins,
            userAgent,
            canvas
        },
        undetermined: {
            platform,
            devicePixelRatio,
            headers,
            broprintAudio
        }
    }
    return data;
}
// helper function to calculate hashes on tracked categories obtained from the fingerPrintJS function
async function getHashes() {
    let fingerprint = await fingerPrintJS();
    let result = {};
    result.data = fingerprint;
    result['hash'] = sha3(JSON.stringify(fingerprint));
    result['hashes'] = {};
    for (let key of Object.keys(fingerprint)) {
        result['hashes'][key] = sha3(JSON.stringify(fingerprint[key]));
        result['hashes']['_' + key] = {};
        for (let sub_key of Object.keys(fingerprint[key])) {
            result['hashes']['_' + key][sub_key] = sha3(JSON.stringify(fingerprint[key][sub_key]));
        }
    }
    return result;
}
function sha3(text) {
    return CryptoJS.SHA3(text).toString();
}
