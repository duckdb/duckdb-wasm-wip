"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined")
      return require.apply(this, arguments);
    throw new Error('Dynamic require of "' + x + '" is not supported');
  });
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // package.json
  var package_default = {
    name: "@duckdb/duckdb-wasm-shell",
    version: "1.11.0",
    description: "",
    author: "Andre Kohn <kohn.a@outlook.com>",
    license: "MIT",
    repository: {
      type: "git",
      url: "https://github.com/duckdb/duckdb-wasm.git"
    },
    keywords: [
      "sql",
      "duckdb",
      "relational",
      "database",
      "data",
      "query",
      "wasm",
      "analytics",
      "olap",
      "arrow",
      "parquet",
      "json",
      "csv"
    ],
    dependencies: {
      "@duckdb/duckdb-wasm": "file:../duckdb-wasm",
      xterm: "^5.1.0",
      "xterm-addon-fit": "^0.7.0",
      "xterm-addon-web-links": "^0.8.0",
      "xterm-addon-webgl": "^0.14.0"
    },
    devDependencies: {
      esbuild: "^0.15.12",
      eslint: "^8.35.0",
      "eslint-plugin-jasmine": "^4.1.3",
      "eslint-plugin-react": "^7.32.2",
      jasmine: "^4.5.0",
      "jasmine-core": "^4.3.0",
      "jasmine-spec-reporter": "^7.0.0",
      "make-dir": "^3.1.0",
      prettier: "^2.8.4",
      rimraf: "^4.3.0",
      "wasm-pack": "^0.10.3"
    },
    scripts: {
      "install:wasmpack": "node ../../node_modules/wasm-pack/install.js",
      "build:debug": "node bundle.mjs debug && tsc --emitDeclarationOnly",
      "build:release": "node bundle.mjs release && tsc --emitDeclarationOnly",
      lint: "eslint src"
    },
    files: [
      "dist",
      "!dist/types/test"
    ],
    main: "dist/shell.cjs",
    module: "dist/shell.mjs",
    types: "dist/shell.d.ts",
    jsdelivr: "dist/shell.cjs",
    unpkg: "dist/shell.mjs",
    sideEffects: false,
    exports: {
      "./dist/shell_bg.wasm": "./dist/shell_bg.wasm",
      "./dist/shell.js": "./dist/shell.js",
      "./dist/shell.cjs": "./dist/shell.cjs",
      "./dist/shell.mjs": "./dist/shell.mjs",
      "./dist/shell": "./dist/shell.mjs",
      ".": {
        types: "./dist/shell.d.ts",
        import: "./dist/shell.mjs",
        require: "./dist/shell.cjs"
      }
    }
  };

  // src/version.ts
  var PACKAGE_NAME = package_default.name;
  var PACKAGE_VERSION = package_default.version;
  var VERSION_PARTS = package_default.version.split(".");
  var PACKAGE_VERSION_MAJOR = VERSION_PARTS[0];
  var PACKAGE_VERSION_MINOR = VERSION_PARTS[1];
  var PACKAGE_VERSION_PATCH = VERSION_PARTS[2];

  // src/shell.ts
  var duckdb2 = __toESM(__require("@duckdb/duckdb-wasm"));

  // crate/pkg/shell.js
  var import_duckdb_wasm = __require("@duckdb/duckdb-wasm");
  var import_xterm = __require("xterm");
  var import_xterm_addon_fit = __require("xterm-addon-fit");
  var import_xterm_addon_web_links = __require("xterm-addon-web-links");
  var import_xterm_addon_webgl = __require("xterm-addon-webgl");
  var import_meta = {};
  var wasm;
  var heap = new Array(32).fill(void 0);
  heap.push(void 0, null, true, false);
  function getObject(idx) {
    return heap[idx];
  }
  var heap_next = heap.length;
  function dropObject(idx) {
    if (idx < 36)
      return;
    heap[idx] = heap_next;
    heap_next = idx;
  }
  function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
  }
  function addHeapObject(obj) {
    if (heap_next === heap.length)
      heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];
    heap[idx] = obj;
    return idx;
  }
  var WASM_VECTOR_LEN = 0;
  var cachegetUint8Memory0 = null;
  function getUint8Memory0() {
    if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== wasm.memory.buffer) {
      cachegetUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory0;
  }
  var cachedTextEncoder = new TextEncoder("utf-8");
  var encodeString = typeof cachedTextEncoder.encodeInto === "function" ? function(arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
  } : function(arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
      read: arg.length,
      written: buf.length
    };
  };
  function passStringToWasm0(arg, malloc, realloc) {
    if (realloc === void 0) {
      const buf = cachedTextEncoder.encode(arg);
      const ptr2 = malloc(buf.length);
      getUint8Memory0().subarray(ptr2, ptr2 + buf.length).set(buf);
      WASM_VECTOR_LEN = buf.length;
      return ptr2;
    }
    let len = arg.length;
    let ptr = malloc(len);
    const mem = getUint8Memory0();
    let offset = 0;
    for (; offset < len; offset++) {
      const code = arg.charCodeAt(offset);
      if (code > 127)
        break;
      mem[ptr + offset] = code;
    }
    if (offset !== len) {
      if (offset !== 0) {
        arg = arg.slice(offset);
      }
      ptr = realloc(ptr, len, len = offset + arg.length * 3);
      const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
      const ret = encodeString(arg, view);
      offset += ret.written;
    }
    WASM_VECTOR_LEN = offset;
    return ptr;
  }
  var cachegetInt32Memory0 = null;
  function getInt32Memory0() {
    if (cachegetInt32Memory0 === null || cachegetInt32Memory0.buffer !== wasm.memory.buffer) {
      cachegetInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachegetInt32Memory0;
  }
  function isLikeNone(x) {
    return x === void 0 || x === null;
  }
  var cachegetFloat64Memory0 = null;
  function getFloat64Memory0() {
    if (cachegetFloat64Memory0 === null || cachegetFloat64Memory0.buffer !== wasm.memory.buffer) {
      cachegetFloat64Memory0 = new Float64Array(wasm.memory.buffer);
    }
    return cachegetFloat64Memory0;
  }
  function debugString(val) {
    const type = typeof val;
    if (type == "number" || type == "boolean" || val == null) {
      return `${val}`;
    }
    if (type == "string") {
      return `"${val}"`;
    }
    if (type == "symbol") {
      const description = val.description;
      if (description == null) {
        return "Symbol";
      } else {
        return `Symbol(${description})`;
      }
    }
    if (type == "function") {
      const name = val.name;
      if (typeof name == "string" && name.length > 0) {
        return `Function(${name})`;
      } else {
        return "Function";
      }
    }
    if (Array.isArray(val)) {
      const length = val.length;
      let debug = "[";
      if (length > 0) {
        debug += debugString(val[0]);
      }
      for (let i = 1; i < length; i++) {
        debug += ", " + debugString(val[i]);
      }
      debug += "]";
      return debug;
    }
    const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
    let className;
    if (builtInMatches.length > 1) {
      className = builtInMatches[1];
    } else {
      return toString.call(val);
    }
    if (className == "Object") {
      try {
        return "Object(" + JSON.stringify(val) + ")";
      } catch (_) {
        return "Object";
      }
    }
    if (val instanceof Error) {
      return `${val.name}: ${val.message}
${val.stack}`;
    }
    return className;
  }
  var cachedTextDecoder = new TextDecoder("utf-8", { ignoreBOM: true, fatal: true });
  cachedTextDecoder.decode();
  function getStringFromWasm0(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
  }
  function makeMutClosure(arg0, arg1, dtor, f) {
    const state = { a: arg0, b: arg1, cnt: 1, dtor };
    const real = (...args) => {
      state.cnt++;
      const a = state.a;
      state.a = 0;
      try {
        return f(a, state.b, ...args);
      } finally {
        if (--state.cnt === 0) {
          wasm.__wbindgen_export_2.get(state.dtor)(a, state.b);
        } else {
          state.a = a;
        }
      }
    };
    real.original = state;
    return real;
  }
  function __wbg_adapter_24(arg0, arg1, arg2) {
    var ret = wasm._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h3e86e3932a86c993(arg0, arg1, addHeapObject(arg2));
    return ret !== 0;
  }
  function __wbg_adapter_27(arg0, arg1, arg2) {
    wasm._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h4e6457fadc765da6(arg0, arg1, addHeapObject(arg2));
  }
  function embed(elem, runtime, options) {
    wasm.embed(addHeapObject(elem), addHeapObject(runtime), addHeapObject(options));
  }
  function write(text) {
    var ptr0 = passStringToWasm0(text, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.write(ptr0, len0);
  }
  function writeln(text) {
    var ptr0 = passStringToWasm0(text, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.writeln(ptr0, len0);
  }
  function resize(_width, _height) {
    wasm.resize(_width, _height);
  }
  var stack_pointer = 32;
  function addBorrowedObject(obj) {
    if (stack_pointer == 1)
      throw new Error("out of js stack");
    heap[--stack_pointer] = obj;
    return stack_pointer;
  }
  function loadHistory(history, cursor) {
    try {
      wasm.loadHistory(addBorrowedObject(history), cursor);
    } finally {
      heap[stack_pointer++] = void 0;
    }
  }
  function configureDatabase(db) {
    var ret = wasm.configureDatabase(addHeapObject(db));
    return takeObject(ret);
  }
  function handleError(f, args) {
    try {
      return f.apply(this, args);
    } catch (e) {
      wasm.__wbindgen_exn_store(addHeapObject(e));
    }
  }
  var cachegetUint32Memory0 = null;
  function getUint32Memory0() {
    if (cachegetUint32Memory0 === null || cachegetUint32Memory0.buffer !== wasm.memory.buffer) {
      cachegetUint32Memory0 = new Uint32Array(wasm.memory.buffer);
    }
    return cachegetUint32Memory0;
  }
  function passArray32ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 4);
    getUint32Memory0().set(arg, ptr / 4);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
  }
  function passArray8ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 1);
    getUint8Memory0().set(arg, ptr / 1);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
  }
  function __wbg_adapter_211(arg0, arg1, arg2, arg3) {
    wasm.wasm_bindgen__convert__closures__invoke2_mut__h7b9f25aec5447799(arg0, arg1, addHeapObject(arg2), addHeapObject(arg3));
  }
  var WcWidth = Object.freeze({ Width0: 0, "0": "Width0", Width1: 1, "1": "Width1", Width2: 2, "2": "Width2" });
  var ShellInputContext = Object.freeze({ FileInput: 0, "0": "FileInput" });
  var DuckDBConfig = class {
    static __wrap(ptr) {
      const obj = Object.create(DuckDBConfig.prototype);
      obj.ptr = ptr;
      return obj;
    }
    __destroy_into_raw() {
      const ptr = this.ptr;
      this.ptr = 0;
      return ptr;
    }
    free() {
      const ptr = this.__destroy_into_raw();
      wasm.__wbg_duckdbconfig_free(ptr);
    }
    get path() {
      try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.duckdbconfig_path(retptr, this.ptr);
        var r0 = getInt32Memory0()[retptr / 4 + 0];
        var r1 = getInt32Memory0()[retptr / 4 + 1];
        let v0;
        if (r0 !== 0) {
          v0 = getStringFromWasm0(r0, r1).slice();
          wasm.__wbindgen_free(r0, r1 * 1);
        }
        return v0;
      } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
      }
    }
    set path(path) {
      var ptr0 = isLikeNone(path) ? 0 : passStringToWasm0(path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
      var len0 = WASM_VECTOR_LEN;
      wasm.duckdbconfig_set_path(this.ptr, ptr0, len0);
    }
  };
  async function load(module, imports) {
    if (typeof Response === "function" && module instanceof Response) {
      if (typeof WebAssembly.instantiateStreaming === "function") {
        try {
          return await WebAssembly.instantiateStreaming(module, imports);
        } catch (e) {
          if (module.headers.get("Content-Type") != "application/wasm") {
            console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);
          } else {
            throw e;
          }
        }
      }
      const bytes = await module.arrayBuffer();
      return await WebAssembly.instantiate(bytes, imports);
    } else {
      const instance = await WebAssembly.instantiate(module, imports);
      if (instance instanceof WebAssembly.Instance) {
        return { instance, module };
      } else {
        return instance;
      }
    }
  }
  async function init(input) {
    if (typeof input === "undefined") {
      input = new URL("shell_bg.wasm", import_meta.url);
    }
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbg_setallowProposedApi_cfb269e8e3377640 = function(arg0, arg1) {
      getObject(arg0).allowProposedApi = arg1 !== 0;
    };
    imports.wbg.__wbg_setcursorBlink_a86479d2e1c79045 = function(arg0, arg1) {
      getObject(arg0).cursorBlink = arg1 !== 0;
    };
    imports.wbg.__wbg_setcursorWidth_33b9ca879009416e = function(arg0, arg1) {
      getObject(arg0).cursorWidth = arg1 >>> 0;
    };
    imports.wbg.__wbg_setdrawBoldTextInBrightColors_fd29f92ff197d87d = function(arg0, arg1) {
      getObject(arg0).drawBoldTextInBrightColors = arg1 !== 0;
    };
    imports.wbg.__wbg_setfontSize_2390052bdfa0951f = function(arg0, arg1) {
      getObject(arg0).fontSize = arg1 >>> 0;
    };
    imports.wbg.__wbg_setfontFamily_a76723a99b3e1c44 = function(arg0, arg1, arg2) {
      getObject(arg0).fontFamily = getStringFromWasm0(arg1, arg2);
    };
    imports.wbg.__wbg_setrightClickSelectsWord_b360a1259d32073b = function(arg0, arg1) {
      getObject(arg0).rightClickSelectsWord = arg1 !== 0;
    };
    imports.wbg.__wbg_setrows_869f76d0b575783a = function(arg0, arg1) {
      getObject(arg0).rows = arg1 >>> 0;
    };
    imports.wbg.__wbg_settheme_8e79c01462f90cdf = function(arg0, arg1) {
      getObject(arg0).theme = getObject(arg1);
    };
    imports.wbg.__wbg_setforeground_edd982f95949c129 = function(arg0, arg1, arg2) {
      getObject(arg0).foreground = getStringFromWasm0(arg1, arg2);
    };
    imports.wbg.__wbg_setbackground_24012fa04dc675fc = function(arg0, arg1, arg2) {
      getObject(arg0).background = getStringFromWasm0(arg1, arg2);
    };
    imports.wbg.__wbg_setbrightYellow_862f40b15257431a = function(arg0, arg1, arg2) {
      getObject(arg0).brightYellow = getStringFromWasm0(arg1, arg2);
    };
    imports.wbg.__wbg_construct_9d9938ba79ea4475 = function(arg0) {
      var ret = new import_xterm.Terminal(getObject(arg0));
      return addHeapObject(ret);
    };
    imports.wbg.__wbg_cols_f4f2fd6e0933a109 = function(arg0) {
      var ret = getObject(arg0).cols;
      return ret;
    };
    imports.wbg.__wbg_focus_5fff41e8198ad0b4 = function(arg0) {
      getObject(arg0).focus();
    };
    imports.wbg.__wbg_open_c7703947d6302f6c = function(arg0, arg1) {
      getObject(arg0).open(takeObject(arg1));
    };
    imports.wbg.__wbg_attachCustomKeyEventHandler_9c38a062a62eddd5 = function(arg0, arg1) {
      getObject(arg0).attachCustomKeyEventHandler(getObject(arg1));
    };
    imports.wbg.__wbg_write_167ebfb900d36862 = function(arg0, arg1, arg2) {
      getObject(arg0).write(getStringFromWasm0(arg1, arg2));
    };
    imports.wbg.__wbg_loadAddon_0d8374e2ad409924 = function(arg0, arg1) {
      getObject(arg0).loadAddon(takeObject(arg1));
    };
    imports.wbg.__wbindgen_object_drop_ref = function(arg0) {
      takeObject(arg0);
    };
    imports.wbg.__wbg_instanceof_WebglAddon_c39f68697a31af73 = function(arg0) {
      var ret = getObject(arg0) instanceof import_xterm_addon_webgl.WebglAddon;
      return ret;
    };
    imports.wbg.__wbg_new_58c6288db0a82870 = function(arg0) {
      var ret = new import_xterm_addon_webgl.WebglAddon(arg0 === 16777215 ? void 0 : arg0 !== 0);
      return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_cb_drop = function(arg0) {
      const obj = takeObject(arg0).original;
      if (obj.cnt-- == 1) {
        obj.a = 0;
        return true;
      }
      var ret = false;
      return ret;
    };
    imports.wbg.__wbg_getFeatureFlags_3fbe38b898027f8e = function() {
      return handleError(function(arg0) {
        var ret = getObject(arg0).getFeatureFlags();
        return addHeapObject(ret);
      }, arguments);
    };
    imports.wbg.__wbg_collectFileStatistics_d5bb7163392f63a7 = function() {
      return handleError(function(arg0, arg1, arg2, arg3) {
        var ret = getObject(arg0).collectFileStatistics(getStringFromWasm0(arg1, arg2), arg3 !== 0);
        return addHeapObject(ret);
      }, arguments);
    };
    imports.wbg.__wbg_exportFileStatistics_047e5ff39e3cd97e = function() {
      return handleError(function(arg0, arg1, arg2) {
        var ret = getObject(arg0).exportFileStatistics(getStringFromWasm0(arg1, arg2));
        return addHeapObject(ret);
      }, arguments);
    };
    imports.wbg.__wbg_withWebGL_23ecf5d40e6afbed = function(arg0) {
      var ret = getObject(arg0).withWebGL;
      return ret;
    };
    imports.wbg.__wbindgen_object_clone_ref = function(arg0) {
      var ret = getObject(arg0);
      return addHeapObject(ret);
    };
    imports.wbg.__wbg_pushInputToHistory_be6169df38305347 = function() {
      return handleError(function(arg0, arg1, arg2) {
        var ret = getObject(arg0).pushInputToHistory(getStringFromWasm0(arg1, arg2));
        return addHeapObject(ret);
      }, arguments);
    };
    imports.wbg.__wbg_getPlatformFeatures_c95d7aa09758c47e = function() {
      return handleError(function() {
        var ret = (0, import_duckdb_wasm.getPlatformFeatures)();
        return addHeapObject(ret);
      }, arguments);
    };
    imports.wbg.__wbg_bigInt64Array_c5434225e36e999d = function(arg0) {
      var ret = getObject(arg0).bigInt64Array;
      return ret;
    };
    imports.wbg.__wbg_crossOriginIsolated_8ef3a49137dfb764 = function(arg0) {
      var ret = getObject(arg0).crossOriginIsolated;
      return ret;
    };
    imports.wbg.__wbg_wasmThreads_ee9dc3f62d002e58 = function(arg0) {
      var ret = getObject(arg0).wasmThreads;
      return ret;
    };
    imports.wbg.__wbg_wasmSIMD_65312a153e3a0ea1 = function(arg0) {
      var ret = getObject(arg0).wasmSIMD;
      return ret;
    };
    imports.wbg.__wbg_wasmBulkMemory_42658b625c12cf27 = function(arg0) {
      var ret = getObject(arg0).wasmBulkMemory;
      return ret;
    };
    imports.wbg.__wbg_wasmExceptions_fd3690b4fcea2b6c = function(arg0) {
      var ret = getObject(arg0).wasmExceptions;
      return ret;
    };
    imports.wbg.__wbg_open_1c24085b4339ac18 = function() {
      return handleError(function(arg0, arg1) {
        var ret = getObject(arg0).open(DuckDBConfig.__wrap(arg1));
        return addHeapObject(ret);
      }, arguments);
    };
    imports.wbg.__wbg_getVersion_498e84d9ed3a6710 = function() {
      return handleError(function(arg0) {
        var ret = getObject(arg0).getVersion();
        return addHeapObject(ret);
      }, arguments);
    };
    imports.wbg.__wbg_connectInternal_2a301658fb915262 = function() {
      return handleError(function(arg0) {
        var ret = getObject(arg0).connectInternal();
        return addHeapObject(ret);
      }, arguments);
    };
    imports.wbg.__wbg_copyFileToBuffer_e4a7050307f57c30 = function() {
      return handleError(function(arg0, arg1, arg2) {
        var ret = getObject(arg0).copyFileToBuffer(getStringFromWasm0(arg1, arg2));
        return addHeapObject(ret);
      }, arguments);
    };
    imports.wbg.__wbg_dropFiles_4d857401e3dd75ab = function() {
      return handleError(function(arg0) {
        var ret = getObject(arg0).dropFiles();
        return addHeapObject(ret);
      }, arguments);
    };
    imports.wbg.__wbg_dropFile_78cc44051c1ddec2 = function() {
      return handleError(function(arg0, arg1, arg2) {
        var ret = getObject(arg0).dropFile(getStringFromWasm0(arg1, arg2));
        return addHeapObject(ret);
      }, arguments);
    };
    imports.wbg.__wbg_globFiles_7af26f0d3bb9c2f6 = function() {
      return handleError(function(arg0, arg1, arg2) {
        var ret = getObject(arg0).globFiles(getStringFromWasm0(arg1, arg2));
        return addHeapObject(ret);
      }, arguments);
    };
    imports.wbg.__wbg_pickFiles_0773778daac97095 = function() {
      return handleError(function(arg0) {
        var ret = getObject(arg0).pickFiles();
        return addHeapObject(ret);
      }, arguments);
    };
    imports.wbg.__wbg_downloadFile_223fed31724de5a9 = function() {
      return handleError(function(arg0, arg1, arg2, arg3) {
        var ret = getObject(arg0).downloadFile(getStringFromWasm0(arg1, arg2), takeObject(arg3));
        return addHeapObject(ret);
      }, arguments);
    };
    imports.wbg.__wbg_runQuery_73797dc478f1bce2 = function() {
      return handleError(function(arg0, arg1, arg2, arg3) {
        var ret = getObject(arg0).runQuery(arg1 >>> 0, getStringFromWasm0(arg2, arg3));
        return addHeapObject(ret);
      }, arguments);
    };
    imports.wbg.__wbg_tokenize_17d3fb98b81f8e3b = function() {
      return handleError(function(arg0, arg1, arg2) {
        var ret = getObject(arg0).tokenize(getStringFromWasm0(arg1, arg2));
        return addHeapObject(ret);
      }, arguments);
    };
    imports.wbg.__wbg_readClipboardText_cdb76d02b35ab9d4 = function() {
      return handleError(function(arg0) {
        var ret = getObject(arg0).readClipboardText();
        return addHeapObject(ret);
      }, arguments);
    };
    imports.wbg.__wbg_instanceof_WebLinksAddon_fbcf4efb54881c53 = function(arg0) {
      var ret = getObject(arg0) instanceof import_xterm_addon_web_links.WebLinksAddon;
      return ret;
    };
    imports.wbg.__wbg_fontFamily_bf454fed644c371e = function(arg0, arg1) {
      var ret = getObject(arg1).fontFamily;
      var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
      var len0 = WASM_VECTOR_LEN;
      getInt32Memory0()[arg0 / 4 + 1] = len0;
      getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    };
    imports.wbg.__wbg_backgroundColor_13124d7a2f6922da = function(arg0, arg1) {
      var ret = getObject(arg1).backgroundColor;
      var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
      var len0 = WASM_VECTOR_LEN;
      getInt32Memory0()[arg0 / 4 + 1] = len0;
      getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    };
    imports.wbg.__wbg_new_6bf4fb65423e34f9 = function(arg0, arg1, arg2) {
      var ret = new import_xterm_addon_web_links.WebLinksAddon(getObject(arg0), getObject(arg1), arg2 === 16777215 ? void 0 : arg2 !== 0);
      return addHeapObject(ret);
    };
    imports.wbg.__wbg_new_670d6f7b0bfae3ee = function() {
      var ret = new import_xterm_addon_fit.FitAddon();
      return addHeapObject(ret);
    };
    imports.wbg.__wbg_fit_fea2302f520fa7cc = function(arg0) {
      getObject(arg0).fit();
    };
    imports.wbg.__wbg_static_accessor_PACKAGE_NAME_da91149963a32187 = function(arg0) {
      var ret = import_duckdb_wasm.PACKAGE_NAME;
      var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
      var len0 = WASM_VECTOR_LEN;
      getInt32Memory0()[arg0 / 4 + 1] = len0;
      getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    };
    imports.wbg.__wbg_static_accessor_PACKAGE_VERSION_8aa2f518d9081bf5 = function(arg0) {
      var ret = import_duckdb_wasm.PACKAGE_VERSION;
      var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
      var len0 = WASM_VECTOR_LEN;
      getInt32Memory0()[arg0 / 4 + 1] = len0;
      getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    };
    imports.wbg.__wbg_log_39e5c6dfbf35ce2a = function(arg0, arg1) {
      console.log(getStringFromWasm0(arg0, arg1));
    };
    imports.wbg.__wbg_error_e42d6a50bd4cd544 = function(arg0, arg1) {
      console.error(getStringFromWasm0(arg0, arg1));
    };
    imports.wbg.__wbg_warn_8c6115cb2bc8bed9 = function(arg0, arg1) {
      console.warn(getStringFromWasm0(arg0, arg1));
    };
    imports.wbg.__wbindgen_json_serialize = function(arg0, arg1) {
      const obj = getObject(arg1);
      var ret = JSON.stringify(obj === void 0 ? null : obj);
      var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
      var len0 = WASM_VECTOR_LEN;
      getInt32Memory0()[arg0 / 4 + 1] = len0;
      getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    };
    imports.wbg.__wbg_disconnect_503fc005d621c8c7 = function() {
      return handleError(function(arg0, arg1) {
        var ret = getObject(arg0).disconnect(arg1 >>> 0);
        return addHeapObject(ret);
      }, arguments);
    };
    imports.wbg.__wbg_offsets_b3b1bdd37d9a4f30 = function(arg0, arg1) {
      var ret = getObject(arg1).offsets;
      var ptr0 = passArray32ToWasm0(ret, wasm.__wbindgen_malloc);
      var len0 = WASM_VECTOR_LEN;
      getInt32Memory0()[arg0 / 4 + 1] = len0;
      getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    };
    imports.wbg.__wbg_types_cc4d77772fac0646 = function(arg0, arg1) {
      var ret = getObject(arg1).types;
      var ptr0 = passArray8ToWasm0(ret, wasm.__wbindgen_malloc);
      var len0 = WASM_VECTOR_LEN;
      getInt32Memory0()[arg0 / 4 + 1] = len0;
      getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    };
    imports.wbg.__wbg_blockStats_b4d97ec10e70983d = function(arg0) {
      var ret = getObject(arg0).blockStats;
      return addHeapObject(ret);
    };
    imports.wbg.__wbg_totalFileWrites_bbaee851a41a14ff = function(arg0) {
      var ret = getObject(arg0).totalFileWrites;
      return addHeapObject(ret);
    };
    imports.wbg.__wbg_totalFileReadsAhead_ddd1fa3f99bbb6b5 = function(arg0) {
      var ret = getObject(arg0).totalFileReadsAhead;
      return addHeapObject(ret);
    };
    imports.wbg.__wbg_totalFileReadsCold_1db94cbad8a68e51 = function(arg0) {
      var ret = getObject(arg0).totalFileReadsCold;
      return addHeapObject(ret);
    };
    imports.wbg.__wbg_totalFileReadsCached_47f56ad6f5eea3e2 = function(arg0) {
      var ret = getObject(arg0).totalFileReadsCached;
      return addHeapObject(ret);
    };
    imports.wbg.__wbg_totalPageAccesses_872b05c6d29a292d = function(arg0) {
      var ret = getObject(arg0).totalPageAccesses;
      return addHeapObject(ret);
    };
    imports.wbg.__wbg_totalPageLoads_f735ffd254650c2a = function(arg0) {
      var ret = getObject(arg0).totalPageLoads;
      return addHeapObject(ret);
    };
    imports.wbg.__wbg_blockSize_672ac525e53ba36d = function(arg0) {
      var ret = getObject(arg0).blockSize;
      return addHeapObject(ret);
    };
    imports.wbg.__wbg_new_59cb74e423758ede = function() {
      var ret = new Error();
      return addHeapObject(ret);
    };
    imports.wbg.__wbg_stack_558ba5917b466edd = function(arg0, arg1) {
      var ret = getObject(arg1).stack;
      var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
      var len0 = WASM_VECTOR_LEN;
      getInt32Memory0()[arg0 / 4 + 1] = len0;
      getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    };
    imports.wbg.__wbg_error_4bb6c2a97407129a = function(arg0, arg1) {
      try {
        console.error(getStringFromWasm0(arg0, arg1));
      } finally {
        wasm.__wbindgen_free(arg0, arg1);
      }
    };
    imports.wbg.__wbg_instanceof_Window_11e25482011fc506 = function(arg0) {
      var ret = getObject(arg0) instanceof Window;
      return ret;
    };
    imports.wbg.__wbg_performance_9d1ecf711183e1d5 = function(arg0) {
      var ret = getObject(arg0).performance;
      return isLikeNone(ret) ? 0 : addHeapObject(ret);
    };
    imports.wbg.__wbg_now_44a034aa2e1d73dd = function(arg0) {
      var ret = getObject(arg0).now();
      return ret;
    };
    imports.wbg.__wbg_type_55a19f61b3198ce6 = function(arg0, arg1) {
      var ret = getObject(arg1).type;
      var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
      var len0 = WASM_VECTOR_LEN;
      getInt32Memory0()[arg0 / 4 + 1] = len0;
      getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    };
    imports.wbg.__wbg_ctrlKey_8fa508d0b540bc8f = function(arg0) {
      var ret = getObject(arg0).ctrlKey;
      return ret;
    };
    imports.wbg.__wbg_metaKey_d60075e40f8f06d7 = function(arg0) {
      var ret = getObject(arg0).metaKey;
      return ret;
    };
    imports.wbg.__wbg_key_6827d862c9cc3928 = function(arg0, arg1) {
      var ret = getObject(arg1).key;
      var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
      var len0 = WASM_VECTOR_LEN;
      getInt32Memory0()[arg0 / 4 + 1] = len0;
      getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    };
    imports.wbg.__wbg_get_b7bbf50adcc94294 = function(arg0, arg1) {
      var ret = getObject(arg0)[arg1 >>> 0];
      return addHeapObject(ret);
    };
    imports.wbg.__wbg_length_555f836564bf148d = function(arg0) {
      var ret = getObject(arg0).length;
      return ret;
    };
    imports.wbg.__wbg_call_ba36642bd901572b = function() {
      return handleError(function(arg0, arg1) {
        var ret = getObject(arg0).call(getObject(arg1));
        return addHeapObject(ret);
      }, arguments);
    };
    imports.wbg.__wbg_self_bb69a836a72ec6e9 = function() {
      return handleError(function() {
        var ret = self.self;
        return addHeapObject(ret);
      }, arguments);
    };
    imports.wbg.__wbg_window_3304fc4b414c9693 = function() {
      return handleError(function() {
        var ret = window.window;
        return addHeapObject(ret);
      }, arguments);
    };
    imports.wbg.__wbg_globalThis_e0d21cabc6630763 = function() {
      return handleError(function() {
        var ret = globalThis.globalThis;
        return addHeapObject(ret);
      }, arguments);
    };
    imports.wbg.__wbg_global_8463719227271676 = function() {
      return handleError(function() {
        var ret = global.global;
        return addHeapObject(ret);
      }, arguments);
    };
    imports.wbg.__wbindgen_is_undefined = function(arg0) {
      var ret = getObject(arg0) === void 0;
      return ret;
    };
    imports.wbg.__wbg_newnoargs_9fdd8f3961dd1bee = function(arg0, arg1) {
      var ret = new Function(getStringFromWasm0(arg0, arg1));
      return addHeapObject(ret);
    };
    imports.wbg.__wbg_new_3e1ee746fe308c9f = function(arg0, arg1) {
      var ret = new Error(getStringFromWasm0(arg0, arg1));
      return addHeapObject(ret);
    };
    imports.wbg.__wbg_message_e440fbd911a845a2 = function(arg0) {
      var ret = getObject(arg0).message;
      return addHeapObject(ret);
    };
    imports.wbg.__wbg_toString_e5b96b15120ff6d4 = function(arg0) {
      var ret = getObject(arg0).toString();
      return addHeapObject(ret);
    };
    imports.wbg.__wbg_call_3fc07b7d5fc9022d = function() {
      return handleError(function(arg0, arg1, arg2) {
        var ret = getObject(arg0).call(getObject(arg1), getObject(arg2));
        return addHeapObject(ret);
      }, arguments);
    };
    imports.wbg.__wbg_new_edbe38a4e21329dd = function() {
      var ret = new Object();
      return addHeapObject(ret);
    };
    imports.wbg.__wbg_new_c143a4f563f78c4e = function(arg0, arg1) {
      try {
        var state0 = { a: arg0, b: arg1 };
        var cb0 = (arg02, arg12) => {
          const a = state0.a;
          state0.a = 0;
          try {
            return __wbg_adapter_211(a, state0.b, arg02, arg12);
          } finally {
            state0.a = a;
          }
        };
        var ret = new Promise(cb0);
        return addHeapObject(ret);
      } finally {
        state0.a = state0.b = 0;
      }
    };
    imports.wbg.__wbg_resolve_cae3d8f752f5db88 = function(arg0) {
      var ret = Promise.resolve(getObject(arg0));
      return addHeapObject(ret);
    };
    imports.wbg.__wbg_then_c2361a9d5c9a4fcb = function(arg0, arg1) {
      var ret = getObject(arg0).then(getObject(arg1));
      return addHeapObject(ret);
    };
    imports.wbg.__wbg_then_6c9a4bf55755f9b8 = function(arg0, arg1, arg2) {
      var ret = getObject(arg0).then(getObject(arg1), getObject(arg2));
      return addHeapObject(ret);
    };
    imports.wbg.__wbg_buffer_9e184d6f785de5ed = function(arg0) {
      var ret = getObject(arg0).buffer;
      return addHeapObject(ret);
    };
    imports.wbg.__wbg_length_2d56cb37075fcfb1 = function(arg0) {
      var ret = getObject(arg0).length;
      return ret;
    };
    imports.wbg.__wbg_new_e8101319e4cf95fc = function(arg0) {
      var ret = new Uint8Array(getObject(arg0));
      return addHeapObject(ret);
    };
    imports.wbg.__wbg_set_e8ae7b27314e8b98 = function(arg0, arg1, arg2) {
      getObject(arg0).set(getObject(arg1), arg2 >>> 0);
    };
    imports.wbg.__wbindgen_number_get = function(arg0, arg1) {
      const obj = getObject(arg1);
      var ret = typeof obj === "number" ? obj : void 0;
      getFloat64Memory0()[arg0 / 8 + 1] = isLikeNone(ret) ? 0 : ret;
      getInt32Memory0()[arg0 / 4 + 0] = !isLikeNone(ret);
    };
    imports.wbg.__wbindgen_string_get = function(arg0, arg1) {
      const obj = getObject(arg1);
      var ret = typeof obj === "string" ? obj : void 0;
      var ptr0 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
      var len0 = WASM_VECTOR_LEN;
      getInt32Memory0()[arg0 / 4 + 1] = len0;
      getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    };
    imports.wbg.__wbindgen_debug_string = function(arg0, arg1) {
      var ret = debugString(getObject(arg1));
      var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
      var len0 = WASM_VECTOR_LEN;
      getInt32Memory0()[arg0 / 4 + 1] = len0;
      getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    };
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
      throw new Error(getStringFromWasm0(arg0, arg1));
    };
    imports.wbg.__wbindgen_rethrow = function(arg0) {
      throw takeObject(arg0);
    };
    imports.wbg.__wbindgen_memory = function() {
      var ret = wasm.memory;
      return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_closure_wrapper380 = function(arg0, arg1, arg2) {
      var ret = makeMutClosure(arg0, arg1, 76, __wbg_adapter_24);
      return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_closure_wrapper983 = function(arg0, arg1, arg2) {
      var ret = makeMutClosure(arg0, arg1, 165, __wbg_adapter_27);
      return addHeapObject(ret);
    };
    if (typeof input === "string" || typeof Request === "function" && input instanceof Request || typeof URL === "function" && input instanceof URL) {
      input = fetch(input);
    }
    const { instance, module } = await load(await input, imports);
    wasm = instance.exports;
    init.__wbindgen_wasm_module = module;
    wasm.__wbindgen_start();
    return wasm;
  }
  var shell_default = init;

  // src/utils/history_store.ts
  var DB_VERSION = 4;
  var DB_NAME = "DUCKDB_WASM_SHELL_HISTORY";
  var TABLE_LOG_INFO = "LOG_INFO";
  var TABLE_LOG_ENTRIES = "LOG_ENTRIES";
  var HISTORY_SIZE_SHIFT = 10;
  var HistoryStore = class {
    constructor() {
      this._idbFactory = window.indexedDB;
      this._idb = null;
      this._nextEntryKey = 0;
      this._entryCount = 0;
    }
    async load() {
      if (this._entryCount == 0)
        return [[], 0];
      const tx = this._idb.transaction([TABLE_LOG_ENTRIES, TABLE_LOG_INFO], "readwrite");
      const logs = tx.objectStore(TABLE_LOG_ENTRIES);
      const cursor = logs.openCursor();
      return await new Promise((resolve, reject) => {
        const results = [];
        cursor.onsuccess = (event) => {
          const req = event.target;
          if (req.result != null) {
            results.push(req.result.value.input);
            req.result.continue();
          } else {
            resolve([results, this._nextEntryKey]);
          }
        };
        cursor.onerror = reject;
      });
    }
    async open() {
      this._idb = await new Promise((resolve, reject) => {
        const req = this._idbFactory.open(DB_NAME, DB_VERSION);
        req.onupgradeneeded = (ev) => {
          const openReq = ev.target;
          const idb = openReq.result;
          const tx = openReq.transaction;
          this.createSchema(idb);
          tx.oncomplete = () => resolve(idb);
          tx.onerror = (err) => reject(err);
        };
        req.onsuccess = (_) => {
          const idb = req.result;
          resolve(idb);
        };
        req.onerror = (err) => reject(err);
      });
      await this.loadMetadata();
    }
    async loadMetadata() {
      const entry = await new Promise((resolve, _reject) => {
        const tx = this._idb.transaction([TABLE_LOG_INFO]);
        const logInfo = tx.objectStore(TABLE_LOG_INFO);
        const req = logInfo.get(0);
        req.onsuccess = (e) => resolve(e.target.result || null);
        req.onerror = (e) => {
          console.warn(e);
          resolve(null);
        };
      });
      this._nextEntryKey = (entry == null ? void 0 : entry.nextEntryKey) || 0;
      this._entryCount = (entry == null ? void 0 : entry.entryCount) || 0;
    }
    createSchema(idb) {
      if (idb.objectStoreNames.contains(TABLE_LOG_INFO)) {
        idb.deleteObjectStore(TABLE_LOG_INFO);
      }
      if (idb.objectStoreNames.contains(TABLE_LOG_ENTRIES)) {
        idb.deleteObjectStore(TABLE_LOG_ENTRIES);
      }
      idb.createObjectStore(TABLE_LOG_INFO, {
        keyPath: "key"
      });
      idb.createObjectStore(TABLE_LOG_ENTRIES, {
        keyPath: "key"
      });
    }
    async reset() {
      var _a;
      (_a = this._idb) == null ? void 0 : _a.close();
      this._idb = null;
      this._idbFactory.deleteDatabase(DB_NAME);
      await this.open();
    }
    async push(input) {
      const entryKey = this._nextEntryKey++ & (1 << HISTORY_SIZE_SHIFT) - 1;
      this._entryCount = Math.min(this._entryCount + 1, 1 << HISTORY_SIZE_SHIFT);
      const tx = this._idb.transaction([TABLE_LOG_ENTRIES, TABLE_LOG_INFO], "readwrite");
      const logInfo = tx.objectStore(TABLE_LOG_INFO);
      const logEntries = tx.objectStore(TABLE_LOG_ENTRIES);
      await Promise.all([
        new Promise((resolve, reject) => {
          const r = logEntries.put({
            key: entryKey,
            when: new Date(),
            input
          });
          r.onsuccess = resolve;
          r.onerror = reject;
        }),
        new Promise((resolve, reject) => {
          const r = logInfo.put({
            key: 0,
            nextEntryKey: this._nextEntryKey,
            entryCount: this._entryCount
          });
          r.onsuccess = resolve;
          r.onerror = reject;
        })
      ]);
    }
  };

  // src/utils/files.ts
  var duckdb = __toESM(__require("@duckdb/duckdb-wasm"));
  function pickFilesForFileReader(db) {
    return new Promise((resolve, _reject) => {
      const input = document.createElement("input");
      input.type = "file";
      let closed = false;
      const finish = async () => {
        console.log(input.files);
        closed = true;
        const files = input.files;
        for (let i = 0; i < files.length; ++i) {
          const file = files.item(i);
          await db.dropFile(file.name);
          await db.registerFileHandle(file.name, file, duckdb.DuckDBDataProtocol.BROWSER_FILEREADER, true);
        }
        resolve(files.length);
      };
      const deferredFinish = async () => {
        window.removeEventListener("focus", deferredFinish);
        if (closed) {
          return;
        }
        await new Promise((r) => setTimeout(r, 1e3));
        if (!closed) {
          await finish();
        }
      };
      input.onchange = async function() {
        window.removeEventListener("focus", deferredFinish);
        await finish();
      };
      input.onclick = async function() {
        window.addEventListener("focus", deferredFinish);
      };
      input.click();
    });
  }
  async function pickFiles(db) {
    return await pickFilesForFileReader(db);
  }

  // src/shell.ts
  var hasWebGL = () => {
    if (duckdb2.isSafari()) {
      return false;
    }
    const canvas = document.createElement("canvas");
    const supports = "probablySupportsContext" in canvas ? "probablySupportsContext" : "supportsContext";
    if (supports in canvas) {
      return canvas[supports]("webgl2");
    }
    return "WebGL2RenderingContext" in window;
  };
  var ShellRuntime = class {
    constructor(container) {
      this.container = container;
      this.database = null;
      this.history = new HistoryStore();
      this.resizeHandler = (_event) => {
        const rect = container.getBoundingClientRect();
        resize(rect.width, rect.height);
      };
    }
    async pickFiles() {
      if (this.database == null) {
        console.warn("database is not initialized");
        return 0;
      }
      return await pickFiles(this.database);
    }
    async downloadFile(name, buffer) {
      const blob = new Blob([buffer]);
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = name;
      link.click();
    }
    async readClipboardText() {
      return await navigator.clipboard.readText();
    }
    async writeClipboardText(value) {
      return await navigator.clipboard.writeText(value);
    }
    async pushInputToHistory(value) {
      this.history.push(value);
    }
  };
  function formatBytes(value) {
    const [multiple, k, suffix] = [1e3, "k", "B"];
    const exp = Math.log(value) / Math.log(multiple) | 0;
    const size = Number((value / Math.pow(multiple, exp)).toFixed(2));
    return `${size} ${exp ? `${k}MGTPEZY`[exp - 1] + suffix : `byte${size !== 1 ? "s" : ""}`}`;
  }
  async function embed2(props) {
    var _a, _b;
    await shell_default(props.shellModule);
    const runtime = new ShellRuntime(props.container);
    embed(props.container, runtime, {
      fontFamily: (_a = props.fontFamily) != null ? _a : "monospace",
      backgroundColor: (_b = props.backgroundColor) != null ? _b : "#333",
      withWebGL: hasWebGL()
    });
    props.container.onresize = runtime.resizeHandler;
    const TERM_BOLD = "\x1B[1m";
    const TERM_NORMAL = "\x1B[m";
    const TERM_CLEAR = "\x1B[2K\r";
    const progressHandler = (progress) => {
      if (progress.bytesTotal > 0) {
        const blocks = Math.max(Math.min(Math.floor(progress.bytesLoaded / progress.bytesTotal * 10), 10), 0);
        const bar = `${"#".repeat(blocks)}${"-".repeat(10 - blocks)}`;
        write(`${TERM_CLEAR}${TERM_BOLD}[ RUN ]${TERM_NORMAL} Loading ${bar}`);
      } else {
        write(`${TERM_CLEAR}${TERM_BOLD}[ RUN ]${TERM_NORMAL} Loading ${formatBytes(progress.bytesLoaded)}`);
      }
    };
    writeln(`${TERM_BOLD}[ RUN ]${TERM_NORMAL} Instantiating DuckDB`);
    runtime.database = await props.resolveDatabase(progressHandler);
    writeln(`${TERM_CLEAR}${TERM_BOLD}[ OK  ]${TERM_NORMAL} Instantiating DuckDB`);
    const step = async (label, work) => {
      writeln(`${TERM_BOLD}[ RUN ]${TERM_NORMAL} ${label}`);
      await work();
      writeln(`${TERM_BOLD}[ OK  ]${TERM_NORMAL} ${label}`);
    };
    await step("Loading Shell History", async () => {
      await runtime.history.open();
      const [hist, histCursor] = await runtime.history.load();
      loadHistory(hist, histCursor);
    });
    await step("Attaching Shell", async () => {
      configureDatabase(runtime.database);
    });
  }

  // src/platform.ts
  function getJsDelivrModule() {
    const jsdelivr_dist_url = `https://cdn.jsdelivr.net/npm/${PACKAGE_NAME}@${PACKAGE_VERSION}/dist/`;
    return new URL(`${jsdelivr_dist_url}dist/shell_bg.wasm`);
  }
})();
//# sourceMappingURL=shell.js.map
