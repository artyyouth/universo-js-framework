const K_TYPE_WEBGL_SHADER = 'WebGLShader';
const K_TYPE_WEBGL_PROGRAM = 'WebGLProgram';
const K_TYPE_WEBGL_BUFFER = 'WebGLBuffer';
const K_TYPE_WEBGL_FRAMEBUFFER = 'WebGLFramebuffer';
const K_TYPE_WEBGL_RENDERBUFFER = 'WebGLRenderbuffer';
const K_TYPE_WEBGL_TEXTURE = 'WebGLTexture';
const K_TYPE_WEBGL_ACTIVEINFO = 'WebGLActiveInfo';
const K_TYPE_WEBGL_SHADER_PRECISION_FORMAT = 'WebGLShaderPrecisionFormat';
const K_TYPE_WEBGL_CONTEXT = 'WebGLContext';

(function() {

    function log(msg)
    {
        Debug.log(KS_GL, msg);
    }

    function WebGLRenderingContext(canvas)
    {
        if (!canvas)
            throw new InvalidParameterError;
            
        if (arguments.length > 1)
        {
            this._attrib = arguments[1];
        }
            
        this._canvas = canvas;
        
        this._context = new WebGLContext();
        this._initialized = true;
    }
    
    var exports = WebGLRenderingContext;
    
    WebGLRenderingContext.prototype._canvas = null;
    WebGLRenderingContext.prototype._context = null;
    WebGLRenderingContext.prototype._initialized = false;
    WebGLRenderingContext.prototype._attrib = null;
    WebGLRenderingContext.prototype._programCache = {};
    
    WebGLRenderingContext.prototype.retainShader = function(/* WebGLProgram */ program, /* WebGLShader */ shader) {
        if (!this._programCache[program.handle])
        {
            this._programCache[program.handle] = new Array;
        }
        
        var shaderCache = this._programCache[program.handle];
        if (shaderCache.indexOf(shader) < 0)
        {
            shaderCache.push(shader);
        }
    };
    
    WebGLRenderingContext.prototype.releaseShader = function(/* WebGLProgram */ program, /* WebGLShader */ shader) {
        if (!this._programCache[program.handle])
        {
            return;
        }
        
        var shaderCache = this._programCache[program.handle];
        var idx = shaderCache.indexOf(shader);
        if (idx >= 0)
        {
            shaderCache.splice(idx, 1);
        }
    };
    
    WebGLRenderingContext.prototype.queryShaders = function(/* WebGLProgram */ program)
    {
        if (!this._programCache[program.handle])
        {
            return null;
        }
        
        return this._programCache[program.handle];
    };
    
    WebGLRenderingContext.prototype.clearShaders = function(/* WebGLProgram */ program)
    {
        if (!this._programCache[program.handle])
        {
            return;
        }
        
        this._programCache[program.handle] = null;
    };
    
    /* readonly attribute HTMLCanvasElement */
    const K_ATTR_CANVAS = "canvas";
    WebGLRenderingContext.prototype.__defineGetter__(K_ATTR_CANVAS, function() {
        return this._canvas;
    });
    
    /* readonly attribute GLsizei */ 
    const K_ATTR_DRAWING_BUFFER_WIDTH = "drawingBufferWidth";
    WebGLRenderingContext.prototype.__defineGetter__(K_ATTR_DRAWING_BUFFER_WIDTH, function() {
        if (this._canvas)
        {
            return this._canvas.width;
        }
        return Universo.getWidth();
    });
    
    /* readonly attribute GLsizei */
    const K_ATTR_DRAWING_BUFFER_HEIGHT = "drawingBufferHeight";
    WebGLRenderingContext.prototype.__defineGetter__(K_ATTR_DRAWING_BUFFER_HEIGHT, function() {
        if (this._canvas)
        {
            return this._canvas.height;
        }
        return Universo.getHeight();
    });

    /* WebGLContextAttributes */
    WebGLRenderingContext.prototype.getContextAttributes = function() {
        return this._attrib;
    };
    
    /* boolean */
    WebGLRenderingContext.prototype.isContextLost = function() {
        return false;
    };
    
    /* DOMString[ ] */
    WebGLRenderingContext.prototype.getSupportedExtensions = function() {
        this._context.getSupportedExtensions();
    };
    
    /* object */
    WebGLRenderingContext.prototype.getExtension = function(/*DOMString*/ name) {
        // TODO: Not implemented, low priority.
        return null;
    };

    /* void */
    WebGLRenderingContext.prototype.activeTexture = function(/*GLenum*/ texture) {
        this._context.activeTexture(texture);
    };
    
    /* void */
    WebGLRenderingContext.prototype.attachShader = function(/* WebGLProgram */program, /* WebGLShader */shader) {
        /*
        if (typeof program !== K_TYPE_WEBGL_PROGRAM ||
            typeof shader !== K_TYPE_WEBGL_SHADER)
            throw new InvalidParameterError;
        */
        this._context.attachShader(program.handle, shader.handle);
        this.retainShader(program, shader);
    };
    
    /* void */
    WebGLRenderingContext.prototype.bindAttribLocation = function(/* WebGLProgram */ program, /* GLuint */ index, /* DOMString */ name) {            
        this._context.bindAttribLocation(program.handle, index, name);
    };
    
    /* void */ 
    WebGLRenderingContext.prototype.bindBuffer = function(/* GLenum */ target, /* WebGLBuffer */ buffer) {
        this._context.bindBuffer(target, buffer.handle);
    };
    
    /* void */
    WebGLRenderingContext.prototype.bindFramebuffer = function(/* GLenum */target, /* WebGLFramebuffer */ framebuffer) {
        this._context.bindFramebuffer(target, framebuffer.handle);
    };
    
    /* void */
    WebGLRenderingContext.prototype.bindRenderbuffer = function(/* GLenum */ target, /* WebGLRenderbuffer */ renderbuffer) {
        this._context.bindRenderbuffer(target, renderbuffer.handle);
    };
    
    /* void */
    WebGLRenderingContext.prototype.bindTexture = function(/* GLenum */target, /* WebGLTexture */texture) {
        this._context.bindTexture(target, texture.handle);
    };
    
    /* void */
    WebGLRenderingContext.prototype.blendColor = function(/* GLclampf */ red, /* GLclampf */ green, /* GLclampf */ blue, /* GLclampf */ alpha) {
        this._context.blendColor(red, green, blue, alpha);
    };
    
    /* void */
    WebGLRenderingContext.prototype.blendEquation = function(/* GLenum */ mode) {
        this._context.blendEquation(mode);
    };
    
    /* void */
    WebGLRenderingContext.prototype.blendEquationSeparate = function(/* GLenum */ modeRGB, /* GLenum */ modeAlpha) {
        this._context.blendEquationSeparate(modeRGB, modeAlpha);
    };
    
    /* void */
    WebGLRenderingContext.prototype.blendFunc = function(/* GLenum */sfactor, /* GLenum */dfactor) {
        this._context.blendFunc(sfactor, dfactor);
    };
    
    /* void */
    WebGLRenderingContext.prototype.blendFuncSeparate = function(/* GLenum */srcRGB, /* GLenum */dstRGB, /* GLenum */ srcAlpha, /* GLenum */ dstAlpha) {
        this._context.blendFuncSeparate(srcRGB, dstRGB, srcAlpha, dstAlpha);
    };
    
    /* void */
    WebGLRenderingContext.prototype.bufferData = function(/* GLenum */target, /* ArrayBufferView */data, /* GLenum */usage) {
        // NOTE: parameter "data" could also be [/* ArrayBuffer */ data] or [/* GLsizeiptr */size]
        this._context.bufferData(target, data, usage);
    };
    
    /* void */
    WebGLRenderingContext.prototype.bufferSubData = function(/* GLenum */target, /* GLintptr */offset, /* ArrayBufferView */data) {
        // NOTE: parameter "data" could also be /* ArrayBuffer */data
        this._context.bufferSubData(target, offset, data);
    };

    /* GLenum */
    WebGLRenderingContext.prototype.checkFramebufferStatus = function(/* GLenum */target) {
        return this._context.checkFramebufferStatus(target);
    };
    
    /* void */
    WebGLRenderingContext.prototype.clear = function(/* GLbitfield */mask) {
        this._context.clear(mask);
    };
    
    /* void */
    WebGLRenderingContext.prototype.clearColor = function(/* GLclampf */red, /* GLclampf */green, /* GLclampf */blue, /* GLclampf */alpha) {
        this._context.clearColor(red, green, blue, alpha);
    };
    
    /* void */
    WebGLRenderingContext.prototype.clearDepth = function(/* GLclampf */depth) {
        this._context.clearDepth(depth);
    };
    
    /* void */
    WebGLRenderingContext.prototype.clearStencil = function(/* GLint */s) {
        this._context.clearStencil(s);
    };
    
    /* void */
    WebGLRenderingContext.prototype.colorMask = function(/* GLboolean */red, /* GLboolean */green, /* GLboolean */blue, /* GLboolean */alpha) {
        this._context.colorMask(red, green, blue, alpha);
    };
    
    /* void */
    WebGLRenderingContext.prototype.compileShader = function(/* WebGLShader */shader) {
        this._context.compileShader(shader.handle);
    };

    /* void */
    WebGLRenderingContext.prototype.copyTexImage2D = function(/* GLenum */ target, /* GLint */level, /* GLenum */internalformat, 
                        /* GLint */x, /* GLint */y, /* GLsizei */width, /* GLsizei */height, 
                        /* GLint */border) 
    {
        this._context.copyTexImage2D(target, level, internalformat, x, y, width, height, border);
    };
    
    /* void */
    WebGLRenderingContext.prototype.copyTexSubImage2D = function(/* GLenum */target, /* GLint */level, /* GLint */xoffset, /* GLint */yoffset, 
                           /* GLint */x, /* GLint */y, /* GLsizei */width, /* GLsizei */height)
    {
        this._context.copyTexSubImage2D(target, level, xoffset, yoffset, x, y, width, height);
    };

    /* WebGLBuffer */
    WebGLRenderingContext.prototype.createBuffer = function() {
        return new WebGLBuffer();
    };
    
    /* WebGLFramebuffer */
    WebGLRenderingContext.prototype.createFramebuffer = function() {
        return new WebGLFramebuffer();
    };
    
    /* WebGLProgram */
    WebGLRenderingContext.prototype.createProgram = function() {
        return new WebGLProgram();
    };
    
    /* WebGLRenderbuffer */
    WebGLRenderingContext.prototype.createRenderbuffer = function() {
        return new WebGLRenderbuffer();
    };
    
    /* WebGLShader */
    WebGLRenderingContext.prototype.createShader = function(/* GLenum */type) {
        return new WebGLShader(type);
    };
    
    /* WebGLTexture */
    WebGLRenderingContext.prototype.createTexture = function() {
        // NOTE: the function WebGLContext#createTexture will also create a texture.
        // But it is only a handle(GLuint), not an object, so it will not be deleted properly after GC.
        // So the better solution is new an WebGLTexture object instead, then use WebGLTexture#handle property
        // as other functions' parameter.
        return new WebGLTexture();
    };

    /* void */
    WebGLRenderingContext.prototype.cullFace = function(/* GLenum */mode) {
        this._context.cullFace(mode);
    };

    /* void */
    WebGLRenderingContext.prototype.deleteBuffer = function(/* WebGLBuffer */buffer) {
        this._context.deleteBuffer(buffer.handle);
    };
    
    /* void */
    WebGLRenderingContext.prototype.deleteFramebuffer = function(/* WebGLFramebuffer */framebuffer) {
        this._context.deleteFramebuffer(framebuffer.handle);
    };
    
    /* void */
    WebGLRenderingContext.prototype.deleteProgram = function(/* WebGLProgram */program) {
        this._context.deleteProgram(program.handle);
        this.clearShaders(program);
    };
    
    /* void */
    WebGLRenderingContext.prototype.deleteRenderbuffer = function(/* WebGLRenderbuffer */renderbuffer) {
        this._context.deleteRenderbuffer(renderbuffer.handle);
    };
    
    /* void */
    WebGLRenderingContext.prototype.deleteShader = function(/* WebGLShader */shader) {
        this._context.deleteShader(shader.handle);
    };
    
    /* void */
    WebGLRenderingContext.prototype.deleteTexture = function(/* WebGLTexture */texture) {
        this._context.deleteTexture(texture.handle);
    };

    /* void */
    WebGLRenderingContext.prototype.depthFunc = function(/* GLenum */func) {
        this._context.depthFunc(func);
    };
    
    /* void */
    WebGLRenderingContext.prototype.depthMask = function(/* GLboolean */flag) {
        this._context.depthMask(flag);
    };
    
    /* void */
    WebGLRenderingContext.prototype.depthRange = function(/* GLclampf */zNear, /* GLclampf */zFar) {
        this._context.depthRange(zNear, zFar);
    };
    
    /* void */
    WebGLRenderingContext.prototype.detachShader = function(/* WebGLProgram */program, /* WebGLShader */shader) {
        this._context.detachShader(program.handle, shader.handle);
        this.releaseShader(program, shader);
    };
    
    /* void */
    WebGLRenderingContext.prototype.disable = function(/* GLenum */cap) {
        this._context.disable(cap);
    };
    
    /* void */
    WebGLRenderingContext.prototype.disableVertexAttribArray = function(/* GLuint */index) {
        this._context.disableVertexAttribArray(index);
    };
    
    /* void */
    WebGLRenderingContext.prototype.drawArrays = function(/* GLenum */mode, /* GLint */first, /* GLsizei */count) {
        this._context.drawArrays(mode, first, count);
    };
    
    /* void */
    WebGLRenderingContext.prototype.drawElements = function(/* GLenum */ mode, /* GLsizei */count, /* GLenum */type, /* GLintptr */offset) {
        this._context.drawElements(mode, count, type, offset);
    };

    /* void */
    WebGLRenderingContext.prototype.enable = function(/* GLenum */cap) {
        this._context.enable(cap);
    };
    
    /* void */
    WebGLRenderingContext.prototype.enableVertexAttribArray = function(/* GLuint */index) {
        this._context.enableVertexAttribArray(index);
    };
    
    /* void */
    WebGLRenderingContext.prototype.finish = function() {
        this._context.finish();
    };
    
    /* void */
    WebGLRenderingContext.prototype.flush = function() {
        this._context.flush();
    };
    
    /* void */
    WebGLRenderingContext.prototype.framebufferRenderbuffer = function(/* GLenum */target, /* GLenum */attachment, 
                                 /* GLenum */renderbuffertarget, 
                                 /* WebGLRenderbuffer */renderbuffer) 
    {
        this._context.framebufferRenderbuffer(target, attachment, renderbuffertarget, renderbuffer.handle);
    };
    
    /* void */
    WebGLRenderingContext.prototype.framebufferTexture2D = function(/* GLenum */target, /* GLenum */attachment, /* GLenum */textarget, 
                              /* WebGLTexture */texture, /* GLint */level)
    {
        this._context.framebufferTexture2D(target, attachment, textarget, texture.handle, level);
    };
    
    /* void */
    WebGLRenderingContext.prototype.frontFace = function(/* GLenum */mode) {
        this._context.frontFace(mode);
    };

    /* void */
    WebGLRenderingContext.prototype.generateMipmap = function(/* GLenum */target) {
        this._context.generateMipmap(target);
    };

    /* WebGLActiveInfo */
    WebGLRenderingContext.prototype.getActiveAttrib = function(/* WebGLProgram */program, /* GLuint */ index) {
        return this._context.getActiveAttrib(program.handle, index);
    };
    
    /* WebGLActiveInfo */
    WebGLRenderingContext.prototype.getActiveUniform = function(/* WebGLProgram */program, /* GLuint */index) {
        return this._context.getActiveUniform(program.handle, index);
    };
    
    /* WebGLShader[ ] */
    WebGLRenderingContext.prototype.getAttachedShaders = function(/* WebGLProgram */program) {
        // return this._context.getAttachedShaders(program.handle);
        return this.queryShaders(program);
    };

    /* GLint */
    WebGLRenderingContext.prototype.getAttribLocation = function(/* WebGLProgram */program, /* DOMString */name) {
        return this._context.getAttribLocation(program.handle, name);
    };

    /* any */
    WebGLRenderingContext.prototype.getBufferParameter = function(/* GLenum */target, /* GLenum */pname) {
        return this._context.getBufferParameter(target, pname);
    };
    
    /* any */
    WebGLRenderingContext.prototype.getParameter = function(/* GLenum */pname) {
        return this._context.getParameter(pname);
    };

    /* GLenum */
    WebGLRenderingContext.prototype.getError = function() {
        return this._context.getError();
    };

    /* any */
    WebGLRenderingContext.prototype.getFramebufferAttachmentParameter = function(/* GLenum */target, /* GLenum */attachment, 
                                          /* GLenum */pname)                                       
    {
        return this._context.getFramebufferAttachmentParameter(target, attachment, pname);
    };
    
    /* any */
    WebGLRenderingContext.prototype.getProgramParameter = function(/* WebGLProgram */program, /* GLenum */pname) {
        return this._context.getProgramParameter(program.handle, pname);
    };
    
    /* DOMString */
    WebGLRenderingContext.prototype.getProgramInfoLog = function(/* WebGLProgram */program) {
        return this._context.getProgramInfoLog(program.handle);
    };
    
    /* any */
    WebGLRenderingContext.prototype.getRenderbufferParameter = function(/* GLenum */target, /* GLenum */pname) {
        return this._context.getRenderbufferParameter(target, pname);
    };
    
    /* any */
    WebGLRenderingContext.prototype.getShaderParameter = function(/* WebGLShader */shader, /* GLenum */pname) {
        return this._context.getShaderParameter(shader.handle, pname);
    };
    
    /* WebGLShaderPrecisionFormat */
    WebGLRenderingContext.prototype.getShaderPrecisionFormat = function(/* GLenum */shadertype, /* GLenum */precisiontype) {
        return this._context.getShaderPrecisionFormat(shadertype, precisiontype);
    };
    
    /* DOMString */
    WebGLRenderingContext.prototype.getShaderInfoLog = function(/* WebGLShader */shader) {
        return this._context.getShaderInfoLog(shader.handle);
    };

    /* DOMString */
    WebGLRenderingContext.prototype.getShaderSource = function(/* WebGLShader */shader) {
        return this._context.getShaderSource(shader.handle);
    };

    /* any */
    WebGLRenderingContext.prototype.getTexParameter = function(/* GLenum */target, /* GLenum */pname) {
        return this._context.getTexParameter(target, pname);
    };

    /* any */
    WebGLRenderingContext.prototype.getUniform = function(/* WebGLProgram */program, /* WebGLUniformLocation */location) {
        return this._context.getUniform(program.handle, location);
    };

    /* WebGLUniformLocation */
    WebGLRenderingContext.prototype.getUniformLocation = function(/* WebGLProgram */program, /* DOMString */name) {
        return this._context.getUniformLocation(program.handle, name);
    };

    /* any */
    WebGLRenderingContext.prototype.getVertexAttrib = function(/* GLuint */index, /* GLenum */pname) {
        return this._context.getVertexAttrib(index, pname);
    };
    
    /* GLsizeiptr */
    WebGLRenderingContext.prototype.getVertexAttribOffset = function(/* GLuint */index, /* GLenum */pname) {
        return this._context.getVertexAttribOffset(index, pname);
    };

    /* void */
    WebGLRenderingContext.prototype.hint = function(/* GLenum */target, /* GLenum */mode) {
        this._context.hint(target, mode);
    };
    
    /* GLboolean */
    WebGLRenderingContext.prototype.isBuffer = function(/* WebGLBuffer */buffer) {
        return this._context.isBuffer(buffer.handle);
    };
    
    /* GLboolean */
    WebGLRenderingContext.prototype.isEnabled = function(/* GLenum */cap) {
        return this._context.isEnabled(cap);
    };
    
    /* GLboolean */
    WebGLRenderingContext.prototype.isFramebuffer = function(/* WebGLFramebuffer */framebuffer) {
        return this._context.isFramebuffer(framebuffer.handle);
    };
    
    /* GLboolean */
    WebGLRenderingContext.prototype.isProgram = function(/* WebGLProgram */program) {
        return this._context.isProgram(program.handle);
    };
    
    /* GLboolean */
    WebGLRenderingContext.prototype.isRenderbuffer = function(/* WebGLRenderbuffer */renderbuffer) {
        return this._context.isRenderbuffer(renderbuffer.handle);
    };
    
    /* GLboolean */
    WebGLRenderingContext.prototype.isShader = function(/* WebGLShader */shader) {
        return this._context.isShader(shader);
    };
    
    /* GLboolean */
    WebGLRenderingContext.prototype.isTexture = function(/* WebGLTexture */texture) {
        return this._context.isTexture(texture.handle);
    };
    
    /* void */
    WebGLRenderingContext.prototype.lineWidth = function(/* GLfloat */width) {
        this._context.lineWidth(width);
    };
    
    /* void */
    WebGLRenderingContext.prototype.linkProgram = function(/* WebGLProgram */program) {
        this._context.linkProgram(program.handle);
    };
    
    /* void */
    WebGLRenderingContext.prototype.pixelStorei = function(/* GLenum */pname, /* GLint */param) {
        this._context.pixelStorei(pname, param);
    };
    
    /* void */
    WebGLRenderingContext.prototype.polygonOffset = function(/* GLfloat */factor, /* GLfloat */units) {
        this._context.polygonOffset(factor, units);
    };

    /* void */
    WebGLRenderingContext.prototype.readPixels = function(/* GLint */x, /* GLint */y, /* GLsizei */width, /* GLsizei */height, 
                    /* GLenum */format, /* GLenum */type, /* ArrayBufferView */pixels)                 
    {
        this._context.readPixels(x, y, width, height, format, type, pixels);
    };

    /* void */
    WebGLRenderingContext.prototype.renderbufferStorage = function(/* GLenum */target, /* GLenum */internalformat, 
                             /* GLsizei */width, /* GLsizei */height)
    {
        this._context.renderbufferStorage(target, internalformat, width, height);
    };
    
    /* void */
    WebGLRenderingContext.prototype.sampleCoverage = function(/* GLclampf */value, /* GLboolean */invert) {
        this._context.sampleCoverage(value, invert);
    };
    
    /* void */
    WebGLRenderingContext.prototype.scissor = function(/* GLint */x, /* GLint */y, /* GLsizei */width, /* GLsizei */height) {
        this._context.scissor(x, y, width, height);
    };

    /* void */
    WebGLRenderingContext.prototype.shaderSource = function(/* WebGLShader */shader, /* DOMString */source)
    {
        this._context.shaderSource(shader.handle, source);
    };

    /* void */
    WebGLRenderingContext.prototype.stencilFunc = function(/* GLenum */func, /* GLint */ref, /* GLuint */mask) {
        this._context.stencilFunc(func, mask);
    };
    
    /* void */
    WebGLRenderingContext.prototype.stencilFuncSeparate = function(/* GLenum */face, /* GLenum */func, /* GLint */ref, /* GLuint */mask) {
        this._context.stencilFuncSeparate(face, func, ref, mask);
    };
    
    /* void */
    WebGLRenderingContext.prototype.stencilMask = function(/* GLuint */mask) {
        this._context.stencilMask(mask);
    };
    
    /* void */
    WebGLRenderingContext.prototype.stencilMaskSeparate = function(/* GLenum */face, /* GLuint */mask) {
        this._context.stencilMaskSeparate(face, mask);
    };
    
    /* void */
    WebGLRenderingContext.prototype.stencilOp = function(/* GLenum */fail, /* GLenum */zfail, /* GLenum */zpass) {
        this._context.stencilOp(fail, zfail, zpass);
    };
    
    /* void */
    WebGLRenderingContext.prototype.stencilOpSeparate = function(/* GLenum */face, /* GLenum */fail, /* GLenum */ zfail, /* GLenum */ zpass) {
        this._context.stencilOpSeparate(face, fail, zfail, zpass);
    };

    /*
    void texImage2D(GLenum target, GLint level, GLenum internalformat, 
                    GLsizei width, GLsizei height, GLint border, GLenum format, 
                    GLenum type, ArrayBufferView pixels);
    void texImage2D(GLenum target, GLint level, GLenum internalformat,
                    GLenum format, GLenum type, ImageData pixels);
    void texImage2D(GLenum target, GLint level, GLenum internalformat,
                    GLenum format, GLenum type, HTMLImageElement image) raises (DOMException);
    void texImage2D(GLenum target, GLint level, GLenum internalformat,
                    GLenum format, GLenum type, HTMLCanvasElement canvas) raises (DOMException);
    void texImage2D(GLenum target, GLint level, GLenum internalformat,
                    GLenum format, GLenum type, HTMLVideoElement video) raises (DOMException);
    */
    
    /* void */
    WebGLRenderingContext.prototype.texImage2D = function()
    {
        if (arguments.length == 9)
        {
            var target = arguments[0];
            var level = arguments[1];
            var internalformat = arguments[2];
            var width = arguments[3];
            var height = arguments[4];
            var border = arguments[5];
            var format = arguments[6];
            var type = arguments[7];
            var pixels = arguments[8];
            
            this._context.texImage2D(target, level, internalformat, width, height, border, format, type, pixels);
        }
        else if (arguments.length == 6)
        {
            var img = arguments[6];
        
            if (typeof img !== 'SurfaceImage')
            {
                throw new InvalidParameterError;
            }
            
            var target = arguments[0];
            var level = arguments[1];
            var internalformat = arguments[2];
            var width = img.width;
            var height = img.height;
            var border = 0;
            var format = arguments[3];
            var type = arguments[4];
            var pixels = img.data;
            
            // TODO: make sure the "border" is 0
            this._context.texImage2D(target, level, internalformat, width, height, border, format, type, pixels);
        }
        else
        {
            throw new NotSupportedError("Parameters doesn't meet the definition."); 
        }
    }

    /* void */ 
    WebGLRenderingContext.prototype.texParameterf = function(/* GLenum */ target, /* GLenum */ pname, /* GLfloat */ param) {
        this._context.texParameterf(target, pname, param);
    };
    
    /* void */
    WebGLRenderingContext.prototype.texParameteri = function(/* GLenum */ target, /* GLenum */ pname, /* GLint */ param) {
        this._context.texParameteri(target, pname, param);
    };

    /* void */
    WebGLRenderingContext.prototype.texSubImage2D = function() 
    {
        if (arguments.length == 9)
        {
            var target = arguments[0];
            var level = arguments[1];
            var xoffset = arguments[2];
            var yoffset = arguments[3];
            var width = arguments[4];
            var height = arguments[5];
            var format = arguments[6];
            var type = arguments[7];
            var pixels = arguments[8];
            
            this._context.texSubImage2D(target, level, xoffset, yoffset, width, height, format, type, pixels);
        }
        else if (arguments.length == 7)
        {
            var img = arguments[6];
        
            if (typeof img !== 'SurfaceImage')
            {
                throw new InvalidParameterError;
            }
            
            var target = arguments[0];
            var level = arguments[1];
            var xoffset = arguments[2];
            var yoffset = arguments[3];
            var width = img.width;
            var height = img.height;
            var format = arguments[4];
            var type = arguments[5];
            
            this._context.texSubImage2D(target, level, xoffset, yoffset, width, height, format, type, pixels);
        }
        else
        {
            throw new NotSupportedError("Parameters doesn't meet the definition."); 
        }
    };
    
    /*
    
    void texSubImage2D(GLenum target, GLint level, GLint xoffset, GLint yoffset, 
                       GLsizei width, GLsizei height, 
                       GLenum format, GLenum type, ArrayBufferView pixels)
    void texSubImage2D(GLenum target, GLint level, GLint xoffset, GLint yoffset, 
                       GLenum format, GLenum type, ImageData pixels);
    void texSubImage2D(GLenum target, GLint level, GLint xoffset, GLint yoffset, 
                       GLenum format, GLenum type, HTMLImageElement image) raises (DOMException);
    void texSubImage2D(GLenum target, GLint level, GLint xoffset, GLint yoffset, 
                       GLenum format, GLenum type, HTMLCanvasElement canvas) raises (DOMException);
    void texSubImage2D(GLenum target, GLint level, GLint xoffset, GLint yoffset, 
                       GLenum format, GLenum type, HTMLVideoElement video) raises (DOMException);
    */
    
    /* void */
    WebGLRenderingContext.prototype.uniform1f = function(/* WebGLUniformLocation */ location, /* GLfloat */ x)
    {
        this._context.uniform1f(location, x);
    };
    
    /* void */
    WebGLRenderingContext.prototype.uniform1fv = function(/* WebGLUniformLocation */location, /* Float32Array */ v) {
        this._context.uniform1fv(location, v);
    };
    // void uniform1fv(WebGLUniformLocation location, float[] v);
    
    /* void */
    WebGLRenderingContext.prototype.uniform1i = function(/* WebGLUniformLocation */ location, /* GLint */ x) {
        this._context.uniform1i(location, x);
    };
    
    /* void */
    WebGLRenderingContext.prototype.uniform1iv = function(/* WebGLUniformLocation */ location, /* Int32Array */ v) {
        this._context.uniform1iv(location, v);
    };
    // void uniform1iv(WebGLUniformLocation location, long[] v);
    
    /* void */
    WebGLRenderingContext.prototype.uniform2f = function(/* WebGLUniformLocation */ location, /* GLfloat */ x, /* GLfloat */ y) {
        this._context.uniform2f(location, x, y);
    };
    
    /* void */
    WebGLRenderingContext.prototype.uniform2fv = function(/* WebGLUniformLocation */location, /* Float32Array */ v) {
        this._context.uniform2fv(location, v);
    };
    // void uniform2fv(WebGLUniformLocation location, float[] v);
    
    /* void */
    WebGLRenderingContext.prototype.uniform2i = function(/* WebGLUniformLocation */ location, /* GLint */ x, /* GLint */ y) {
        this._context.uniform2i(location, y);
    };
    
    /* void */
    WebGLRenderingContext.prototype.uniform2iv = function(/* WebGLUniformLocation */ location, /* Int32Array */ v) {
        this._context.uniform2iv(location, v);
    };
    // void uniform2iv(WebGLUniformLocation location, long[] v);
    
    /* void */
    WebGLRenderingContext.prototype.uniform3f = function(/* WebGLUniformLocation */ location, /* GLfloat */ x, /* GLfloat */ y, /* GLfloat */ z) {
        this._context.uniform3f(location, x, y, z);
    };
    
    /* void */
    WebGLRenderingContext.prototype.uniform3fv = function(/* WebGLUniformLocation */location, /* Float32Array */v) {
        this._context.uniform3fv(location, v);
    };
    // void uniform3fv(WebGLUniformLocation location, float[] v);
    
    /* void */ 
    WebGLRenderingContext.prototype.uniform3i = function(/* WebGLUniformLocation */ location, /* GLint */ x, /* GLint */ y, /* GLint */ z) {
        this._context.uniform3i(location, x, y, z);
    };
    
    /* void */ 
    WebGLRenderingContext.prototype.uniform3iv = function(/* WebGLUniformLocation */ location, /* Int32Array */ v) {
        this._context.uniform3iv(location, v);
    };
    // void uniform3iv(WebGLUniformLocation location, long[] v);
    
    /* void */ 
    WebGLRenderingContext.prototype.uniform4f = function(/* WebGLUniformLocation */ location, /* GLfloat */ x, /* GLfloat */ y, /* GLfloat */ z, /* GLfloat */ w) {
        this._context.uniform4f(location, x, y, z, w);
    };
    
    /* void */ 
    WebGLRenderingContext.prototype.uniform4fv = function(/* WebGLUniformLocation */ location, /* Float32Array */ v) {
        this._context.uniform4fv(location, v);
    };
    // void uniform4fv(WebGLUniformLocation location, float[] v);
    
    /* void */ 
    WebGLRenderingContext.prototype.uniform4i = function(/* WebGLUniformLocation */ location, /* GLint */ x, /* GLint */ y, /* GLint */ z, /* GLint */ w) {
        this._context.uniform4i(location, x, y, z, w);
    };
    
    /* void */ 
    WebGLRenderingContext.prototype.uniform4iv = function(/* WebGLUniformLocation */ location, /* Int32Array */ v) {
        this._context.uniform4iv(location, v);
    };
    // void uniform4iv(WebGLUniformLocation location, long[] v);

    /* void */ 
    WebGLRenderingContext.prototype.uniformMatrix2fv = function(/* WebGLUniformLocation */ location, /* GLboolean */ transpose, 
                          /* Float32Array */ value) 
    {
        this._context.uniformMatrix2fv(location, transpose, value);
    };
    /*
    void uniformMatrix2fv(WebGLUniformLocation location, GLboolean transpose, 
                          float[] value);
    */
                          
    /* void */ 
    WebGLRenderingContext.prototype.uniformMatrix3fv = function(/* WebGLUniformLocation */ location, /* GLboolean */ transpose, 
                          /* Float32Array */ value)
    {
        this._context.uniformMatrix3fv(location, transpose, value);
    };
    /*
    void uniformMatrix3fv(WebGLUniformLocation location, GLboolean transpose, 
                          float[] value);
    */
                          
    /* void */ 
    WebGLRenderingContext.prototype.uniformMatrix4fv = function(/* WebGLUniformLocation */ location, /* GLboolean */ transpose, 
                          /* Float32Array */ value)
    {
        this._context.uniformMatrix4fv(location, transpose, value);
    };
    /*
    void uniformMatrix4fv(WebGLUniformLocation location, GLboolean transpose, 
                          float[] value);
    */

    /* void */
    WebGLRenderingContext.prototype.useProgram = function(/* WebGLProgram */ program) {
        this._context.useProgram(program.handle);
    };
    
    /* void */
    WebGLRenderingContext.prototype.validateProgram = function(/* WebGLProgram */ program) {
        this._context.validateProgram(program.handle);
    };

    /* void */
    WebGLRenderingContext.prototype.vertexAttrib1f = function(/* GLuint */ indx, /* GLfloat */ x) {
        this._context.vertexAttrib1f(indx, x);
    };
    
    /* void */
    WebGLRenderingContext.prototype.vertexAttrib1fv = function(/* GLuint */ indx, /* Float32Array */ values) {
        this._context.vertexAttrib1fv(indx, values);
    };
    // void vertexAttrib1fv(GLuint indx, float[] values);
    
    /* void */ 
    WebGLRenderingContext.prototype.vertexAttrib2f = function(/* GLuint */ indx, /* GLfloat */ x, /* GLfloat */ y) {
        this._context.vertexAttrib2f(indx, x, y);
    };
    
    /* void */ 
    WebGLRenderingContext.prototype.vertexAttrib2fv = function(/* GLuint */ indx, /* Float32Array */ values) {
        this._context.vertexAttrib2fv(indx, values);
    };
    // void vertexAttrib2fv(GLuint indx, float[] values);
    
    /* void */ 
    WebGLRenderingContext.prototype.vertexAttrib3f = function(/* GLuint */ indx, /* GLfloat */ x, /* GLfloat */ y, /* GLfloat */ z) {
        this._context.vertexAttrib3f(indx, x, y, z);
    };
    
    /* void */ 
    WebGLRenderingContext.prototype.vertexAttrib3fv = function(/* GLuint */ indx, /* Float32Array */ values) {
        this._context.vertexAttrib3fv(indx, values);
    };
    // void vertexAttrib3fv(GLuint indx, float[] values);
    
    /* void */ 
    WebGLRenderingContext.prototype.vertexAttrib4f = function(/* GLuint */ indx, /* GLfloat */ x, /* GLfloat */ y, /* GLfloat */ z, /* GLfloat */ w) {
        this._context.vertexAttrib4f(indx, x, y, z, w);
    };
    
    /* void */ 
    WebGLRenderingContext.prototype.vertexAttrib4fv = function(/* GLuint */ indx, /* Float32Array */ values) {
        this._context.vertexAttrib4fv(indx, values);
    };
    // void vertexAttrib4fv(GLuint indx, float[] values);
    
    /* void */ 
    WebGLRenderingContext.prototype.vertexAttribPointer = function(/* GLuint */ indx, /* GLint */ size, /* GLenum */ type, 
                             /* GLboolean */ normalized, /* GLsizei */ stride, /* GLintptr */ offset)
    {
        this._context.vertexAttribPointer(indx, size, type, normalized, stride, offset);
    };

    /* void */
    WebGLRenderingContext.prototype.viewport = function(/* GLint */ x, /* GLint */ y, /* GLsizei */ width, /* GLsizei */ height) {
        this._context.viewport(x, y, width, height);
    };
    
    /* ClearBufferMask */
    WebGLRenderingContext.prototype.DEPTH_BUFFER_BIT               = 0x00000100;
    WebGLRenderingContext.prototype.STENCIL_BUFFER_BIT             = 0x00000400;
    WebGLRenderingContext.prototype.COLOR_BUFFER_BIT               = 0x00004000;
    
    /* BeginMode */
    WebGLRenderingContext.prototype.POINTS                         = 0x0000;
    WebGLRenderingContext.prototype.LINES                          = 0x0001;
    WebGLRenderingContext.prototype.LINE_LOOP                      = 0x0002;
    WebGLRenderingContext.prototype.LINE_STRIP                     = 0x0003;
    WebGLRenderingContext.prototype.TRIANGLES                      = 0x0004;
    WebGLRenderingContext.prototype.TRIANGLE_STRIP                 = 0x0005;
    WebGLRenderingContext.prototype.TRIANGLE_FAN                   = 0x0006;
    
    /* AlphaFunction (not supported in ES20) */
    /*      NEVER */
    /*      LESS */
    /*      EQUAL */
    /*      LEQUAL */
    /*      GREATER */
    /*      NOTEQUAL */
    /*      GEQUAL */
    /*      ALWAYS */
    
    /* BlendingFactorDest */
    WebGLRenderingContext.prototype.ZERO                           = 0;
    WebGLRenderingContext.prototype.ONE                            = 1;
    WebGLRenderingContext.prototype.SRC_COLOR                      = 0x0300;
    WebGLRenderingContext.prototype.ONE_MINUS_SRC_COLOR            = 0x0301;
    WebGLRenderingContext.prototype.SRC_ALPHA                      = 0x0302;
    WebGLRenderingContext.prototype.ONE_MINUS_SRC_ALPHA            = 0x0303;
    WebGLRenderingContext.prototype.DST_ALPHA                      = 0x0304;
    WebGLRenderingContext.prototype.ONE_MINUS_DST_ALPHA            = 0x0305;
    
    /* BlendingFactorSrc */
    /*      ZERO */
    /*      ONE */
    WebGLRenderingContext.prototype.DST_COLOR                      = 0x0306;
    WebGLRenderingContext.prototype.ONE_MINUS_DST_COLOR            = 0x0307;
    WebGLRenderingContext.prototype.SRC_ALPHA_SATURATE             = 0x0308;
    /*      SRC_ALPHA */
    /*      ONE_MINUS_SRC_ALPHA */
    /*      DST_ALPHA */
    /*      ONE_MINUS_DST_ALPHA */
    
    /* BlendEquationSeparate */
    WebGLRenderingContext.prototype.FUNC_ADD                       = 0x8006;
    WebGLRenderingContext.prototype.BLEND_EQUATION                 = 0x8009;
    WebGLRenderingContext.prototype.BLEND_EQUATION_RGB             = 0x8009;   /* same as BLEND_EQUATION */
    WebGLRenderingContext.prototype.BLEND_EQUATION_ALPHA           = 0x883D;
    
    /* BlendSubtract */
    WebGLRenderingContext.prototype.FUNC_SUBTRACT                  = 0x800A;
    WebGLRenderingContext.prototype.FUNC_REVERSE_SUBTRACT          = 0x800B;
    
    /* Separate Blend Functions */
    WebGLRenderingContext.prototype.BLEND_DST_RGB                  = 0x80C8;
    WebGLRenderingContext.prototype.BLEND_SRC_RGB                  = 0x80C9;
    WebGLRenderingContext.prototype.BLEND_DST_ALPHA                = 0x80CA;
    WebGLRenderingContext.prototype.BLEND_SRC_ALPHA                = 0x80CB;
    WebGLRenderingContext.prototype.CONSTANT_COLOR                 = 0x8001;
    WebGLRenderingContext.prototype.ONE_MINUS_CONSTANT_COLOR       = 0x8002;
    WebGLRenderingContext.prototype.CONSTANT_ALPHA                 = 0x8003;
    WebGLRenderingContext.prototype.ONE_MINUS_CONSTANT_ALPHA       = 0x8004;
    WebGLRenderingContext.prototype.BLEND_COLOR                    = 0x8005;
    
    /* Buffer Objects */
    WebGLRenderingContext.prototype.ARRAY_BUFFER                   = 0x8892;
    WebGLRenderingContext.prototype.ELEMENT_ARRAY_BUFFER           = 0x8893;
    WebGLRenderingContext.prototype.ARRAY_BUFFER_BINDING           = 0x8894;
    WebGLRenderingContext.prototype.ELEMENT_ARRAY_BUFFER_BINDING   = 0x8895;
    
    WebGLRenderingContext.prototype.STREAM_DRAW                    = 0x88E0;
    WebGLRenderingContext.prototype.STATIC_DRAW                    = 0x88E4;
    WebGLRenderingContext.prototype.DYNAMIC_DRAW                   = 0x88E8;
    
    WebGLRenderingContext.prototype.BUFFER_SIZE                    = 0x8764;
    WebGLRenderingContext.prototype.BUFFER_USAGE                   = 0x8765;
    
    WebGLRenderingContext.prototype.CURRENT_VERTEX_ATTRIB          = 0x8626;
    
    /* CullFaceMode */
    WebGLRenderingContext.prototype.FRONT                          = 0x0404;
    WebGLRenderingContext.prototype.BACK                           = 0x0405;
    WebGLRenderingContext.prototype.FRONT_AND_BACK                 = 0x0408;
    
    /* DepthFunction */
    /*      NEVER */
    /*      LESS */
    /*      EQUAL */
    /*      LEQUAL */
    /*      GREATER */
    /*      NOTEQUAL */
    /*      GEQUAL */
    /*      ALWAYS */
    
    /* EnableCap */
    /* TEXTURE_2D */
    WebGLRenderingContext.prototype.CULL_FACE                      = 0x0B44;
    WebGLRenderingContext.prototype.BLEND                          = 0x0BE2;
    WebGLRenderingContext.prototype.DITHER                         = 0x0BD0;
    WebGLRenderingContext.prototype.STENCIL_TEST                   = 0x0B90;
    WebGLRenderingContext.prototype.DEPTH_TEST                     = 0x0B71;
    WebGLRenderingContext.prototype.SCISSOR_TEST                   = 0x0C11;
    WebGLRenderingContext.prototype.POLYGON_OFFSET_FILL            = 0x8037;
    WebGLRenderingContext.prototype.SAMPLE_ALPHA_TO_COVERAGE       = 0x809E;
    WebGLRenderingContext.prototype.SAMPLE_COVERAGE                = 0x80A0;
    
    /* ErrorCode */
    WebGLRenderingContext.prototype.NO_ERROR                       = 0;
    WebGLRenderingContext.prototype.INVALID_ENUM                   = 0x0500;
    WebGLRenderingContext.prototype.INVALID_VALUE                  = 0x0501;
    WebGLRenderingContext.prototype.INVALID_OPERATION              = 0x0502;
    WebGLRenderingContext.prototype.OUT_OF_MEMORY                  = 0x0505;
    
    /* FrontFaceDirection */
    WebGLRenderingContext.prototype.CW                             = 0x0900;
    WebGLRenderingContext.prototype.CCW                            = 0x0901;
    
    /* GetPName */
    WebGLRenderingContext.prototype.LINE_WIDTH                     = 0x0B21;
    WebGLRenderingContext.prototype.ALIASED_POINT_SIZE_RANGE       = 0x846D;
    WebGLRenderingContext.prototype.ALIASED_LINE_WIDTH_RANGE       = 0x846E;
    WebGLRenderingContext.prototype.CULL_FACE_MODE                 = 0x0B45;
    WebGLRenderingContext.prototype.FRONT_FACE                     = 0x0B46;
    WebGLRenderingContext.prototype.DEPTH_RANGE                    = 0x0B70;
    WebGLRenderingContext.prototype.DEPTH_WRITEMASK                = 0x0B72;
    WebGLRenderingContext.prototype.DEPTH_CLEAR_VALUE              = 0x0B73;
    WebGLRenderingContext.prototype.DEPTH_FUNC                     = 0x0B74;
    WebGLRenderingContext.prototype.STENCIL_CLEAR_VALUE            = 0x0B91;
    WebGLRenderingContext.prototype.STENCIL_FUNC                   = 0x0B92;
    WebGLRenderingContext.prototype.STENCIL_FAIL                   = 0x0B94;
    WebGLRenderingContext.prototype.STENCIL_PASS_DEPTH_FAIL        = 0x0B95;
    WebGLRenderingContext.prototype.STENCIL_PASS_DEPTH_PASS        = 0x0B96;
    WebGLRenderingContext.prototype.STENCIL_REF                    = 0x0B97;
    WebGLRenderingContext.prototype.STENCIL_VALUE_MASK             = 0x0B93;
    WebGLRenderingContext.prototype.STENCIL_WRITEMASK              = 0x0B98;
    WebGLRenderingContext.prototype.STENCIL_BACK_FUNC              = 0x8800;
    WebGLRenderingContext.prototype.STENCIL_BACK_FAIL              = 0x8801;
    WebGLRenderingContext.prototype.STENCIL_BACK_PASS_DEPTH_FAIL   = 0x8802;
    WebGLRenderingContext.prototype.STENCIL_BACK_PASS_DEPTH_PASS   = 0x8803;
    WebGLRenderingContext.prototype.STENCIL_BACK_REF               = 0x8CA3;
    WebGLRenderingContext.prototype.STENCIL_BACK_VALUE_MASK        = 0x8CA4;
    WebGLRenderingContext.prototype.STENCIL_BACK_WRITEMASK         = 0x8CA5;
    WebGLRenderingContext.prototype.VIEWPORT                       = 0x0BA2;
    WebGLRenderingContext.prototype.SCISSOR_BOX                    = 0x0C10;
    /*      SCISSOR_TEST */
    WebGLRenderingContext.prototype.COLOR_CLEAR_VALUE              = 0x0C22;
    WebGLRenderingContext.prototype.COLOR_WRITEMASK                = 0x0C23;
    WebGLRenderingContext.prototype.UNPACK_ALIGNMENT               = 0x0CF5;
    WebGLRenderingContext.prototype.PACK_ALIGNMENT                 = 0x0D05;
    WebGLRenderingContext.prototype.MAX_TEXTURE_SIZE               = 0x0D33;
    WebGLRenderingContext.prototype.MAX_VIEWPORT_DIMS              = 0x0D3A;
    WebGLRenderingContext.prototype.SUBPIXEL_BITS                  = 0x0D50;
    WebGLRenderingContext.prototype.RED_BITS                       = 0x0D52;
    WebGLRenderingContext.prototype.GREEN_BITS                     = 0x0D53;
    WebGLRenderingContext.prototype.BLUE_BITS                      = 0x0D54;
    WebGLRenderingContext.prototype.ALPHA_BITS                     = 0x0D55;
    WebGLRenderingContext.prototype.DEPTH_BITS                     = 0x0D56;
    WebGLRenderingContext.prototype.STENCIL_BITS                   = 0x0D57;
    WebGLRenderingContext.prototype.POLYGON_OFFSET_UNITS           = 0x2A00;
    /*      POLYGON_OFFSET_FILL */
    WebGLRenderingContext.prototype.POLYGON_OFFSET_FACTOR          = 0x8038;
    WebGLRenderingContext.prototype.TEXTURE_BINDING_2D             = 0x8069;
    WebGLRenderingContext.prototype.SAMPLE_BUFFERS                 = 0x80A8;
    WebGLRenderingContext.prototype.SAMPLES                        = 0x80A9;
    WebGLRenderingContext.prototype.SAMPLE_COVERAGE_VALUE          = 0x80AA;
    WebGLRenderingContext.prototype.SAMPLE_COVERAGE_INVERT         = 0x80AB;
    
    /* GetTextureParameter */
    /*      TEXTURE_MAG_FILTER */
    /*      TEXTURE_MIN_FILTER */
    /*      TEXTURE_WRAP_S */
    /*      TEXTURE_WRAP_T */
    
    WebGLRenderingContext.prototype.NUM_COMPRESSED_TEXTURE_FORMATS = 0x86A2;
    WebGLRenderingContext.prototype.COMPRESSED_TEXTURE_FORMATS     = 0x86A3;
    
    /* HintMode */
    WebGLRenderingContext.prototype.DONT_CARE                      = 0x1100;
    WebGLRenderingContext.prototype.FASTEST                        = 0x1101;
    WebGLRenderingContext.prototype.NICEST                         = 0x1102;
    
    /* HintTarget */
    WebGLRenderingContext.prototype.GENERATE_MIPMAP_HINT            = 0x8192;
    
    /* DataType */
    WebGLRenderingContext.prototype.BYTE                           = 0x1400;
    WebGLRenderingContext.prototype.UNSIGNED_BYTE                  = 0x1401;
    WebGLRenderingContext.prototype.SHORT                          = 0x1402;
    WebGLRenderingContext.prototype.UNSIGNED_SHORT                 = 0x1403;
    WebGLRenderingContext.prototype.INT                            = 0x1404;
    WebGLRenderingContext.prototype.UNSIGNED_INT                   = 0x1405;
    WebGLRenderingContext.prototype.FLOAT                          = 0x1406;
    
    /* PixelFormat */
    WebGLRenderingContext.prototype.DEPTH_COMPONENT                = 0x1902;
    WebGLRenderingContext.prototype.ALPHA                          = 0x1906;
    WebGLRenderingContext.prototype.RGB                            = 0x1907;
    WebGLRenderingContext.prototype.RGBA                           = 0x1908;
    WebGLRenderingContext.prototype.LUMINANCE                      = 0x1909;
    WebGLRenderingContext.prototype.LUMINANCE_ALPHA                = 0x190A;
    
    /* PixelType */
    /*      UNSIGNED_BYTE */
    WebGLRenderingContext.prototype.UNSIGNED_SHORT_4_4_4_4         = 0x8033;
    WebGLRenderingContext.prototype.UNSIGNED_SHORT_5_5_5_1         = 0x8034;
    WebGLRenderingContext.prototype.UNSIGNED_SHORT_5_6_5           = 0x8363;
    
    /* Shaders */
    WebGLRenderingContext.prototype.FRAGMENT_SHADER                  = 0x8B30;
    WebGLRenderingContext.prototype.VERTEX_SHADER                    = 0x8B31;
    WebGLRenderingContext.prototype.MAX_VERTEX_ATTRIBS               = 0x8869;
    WebGLRenderingContext.prototype.MAX_VERTEX_UNIFORM_VECTORS       = 0x8DFB;
    WebGLRenderingContext.prototype.MAX_VARYING_VECTORS              = 0x8DFC;
    WebGLRenderingContext.prototype.MAX_COMBINED_TEXTURE_IMAGE_UNITS = 0x8B4D;
    WebGLRenderingContext.prototype.MAX_VERTEX_TEXTURE_IMAGE_UNITS   = 0x8B4C;
    WebGLRenderingContext.prototype.MAX_TEXTURE_IMAGE_UNITS          = 0x8872;
    WebGLRenderingContext.prototype.MAX_FRAGMENT_UNIFORM_VECTORS     = 0x8DFD;
    WebGLRenderingContext.prototype.SHADER_TYPE                      = 0x8B4F;
    WebGLRenderingContext.prototype.DELETE_STATUS                    = 0x8B80;
    WebGLRenderingContext.prototype.LINK_STATUS                      = 0x8B82;
    WebGLRenderingContext.prototype.VALIDATE_STATUS                  = 0x8B83;
    WebGLRenderingContext.prototype.ATTACHED_SHADERS                 = 0x8B85;
    WebGLRenderingContext.prototype.ACTIVE_UNIFORMS                  = 0x8B86;
    WebGLRenderingContext.prototype.ACTIVE_ATTRIBUTES                = 0x8B89;
    WebGLRenderingContext.prototype.SHADING_LANGUAGE_VERSION         = 0x8B8C;
    WebGLRenderingContext.prototype.CURRENT_PROGRAM                  = 0x8B8D;
    
    /* StencilFunction */
    WebGLRenderingContext.prototype.NEVER                          = 0x0200;
    WebGLRenderingContext.prototype.LESS                           = 0x0201;
    WebGLRenderingContext.prototype.EQUAL                          = 0x0202;
    WebGLRenderingContext.prototype.LEQUAL                         = 0x0203;
    WebGLRenderingContext.prototype.GREATER                        = 0x0204;
    WebGLRenderingContext.prototype.NOTEQUAL                       = 0x0205;
    WebGLRenderingContext.prototype.GEQUAL                         = 0x0206;
    WebGLRenderingContext.prototype.ALWAYS                         = 0x0207;
    
    /* StencilOp */
    /*      ZERO */
    WebGLRenderingContext.prototype.KEEP                           = 0x1E00;
    WebGLRenderingContext.prototype.REPLACE                        = 0x1E01;
    WebGLRenderingContext.prototype.INCR                           = 0x1E02;
    WebGLRenderingContext.prototype.DECR                           = 0x1E03;
    WebGLRenderingContext.prototype.INVERT                         = 0x150A;
    WebGLRenderingContext.prototype.INCR_WRAP                      = 0x8507;
    WebGLRenderingContext.prototype.DECR_WRAP                      = 0x8508;
    
    /* StringName */
    WebGLRenderingContext.prototype.VENDOR                         = 0x1F00;
    WebGLRenderingContext.prototype.RENDERER                       = 0x1F01;
    WebGLRenderingContext.prototype.VERSION                        = 0x1F02;
    
    /* TextureMagFilter */
    WebGLRenderingContext.prototype.NEAREST                        = 0x2600;
    WebGLRenderingContext.prototype.LINEAR                         = 0x2601;
    
    /* TextureMinFilter */
    /*      NEAREST */
    /*      LINEAR */
    WebGLRenderingContext.prototype.NEAREST_MIPMAP_NEAREST         = 0x2700;
    WebGLRenderingContext.prototype.LINEAR_MIPMAP_NEAREST          = 0x2701;
    WebGLRenderingContext.prototype.NEAREST_MIPMAP_LINEAR          = 0x2702;
    WebGLRenderingContext.prototype.LINEAR_MIPMAP_LINEAR           = 0x2703;
    
    /* TextureParameterName */
    WebGLRenderingContext.prototype.TEXTURE_MAG_FILTER             = 0x2800;
    WebGLRenderingContext.prototype.TEXTURE_MIN_FILTER             = 0x2801;
    WebGLRenderingContext.prototype.TEXTURE_WRAP_S                 = 0x2802;
    WebGLRenderingContext.prototype.TEXTURE_WRAP_T                 = 0x2803;
    
    /* TextureTarget */
    WebGLRenderingContext.prototype.TEXTURE_2D                     = 0x0DE1;
    WebGLRenderingContext.prototype.TEXTURE                        = 0x1702;
    
    WebGLRenderingContext.prototype.TEXTURE_CUBE_MAP               = 0x8513;
    WebGLRenderingContext.prototype.TEXTURE_BINDING_CUBE_MAP       = 0x8514;
    WebGLRenderingContext.prototype.TEXTURE_CUBE_MAP_POSITIVE_X    = 0x8515;
    WebGLRenderingContext.prototype.TEXTURE_CUBE_MAP_NEGATIVE_X    = 0x8516;
    WebGLRenderingContext.prototype.TEXTURE_CUBE_MAP_POSITIVE_Y    = 0x8517;
    WebGLRenderingContext.prototype.TEXTURE_CUBE_MAP_NEGATIVE_Y    = 0x8518;
    WebGLRenderingContext.prototype.TEXTURE_CUBE_MAP_POSITIVE_Z    = 0x8519;
    WebGLRenderingContext.prototype.TEXTURE_CUBE_MAP_NEGATIVE_Z    = 0x851A;
    WebGLRenderingContext.prototype.MAX_CUBE_MAP_TEXTURE_SIZE      = 0x851C;
    
    /* TextureUnit */
    WebGLRenderingContext.prototype.TEXTURE0                       = 0x84C0;
    WebGLRenderingContext.prototype.TEXTURE1                       = 0x84C1;
    WebGLRenderingContext.prototype.TEXTURE2                       = 0x84C2;
    WebGLRenderingContext.prototype.TEXTURE3                       = 0x84C3;
    WebGLRenderingContext.prototype.TEXTURE4                       = 0x84C4;
    WebGLRenderingContext.prototype.TEXTURE5                       = 0x84C5;
    WebGLRenderingContext.prototype.TEXTURE6                       = 0x84C6;
    WebGLRenderingContext.prototype.TEXTURE7                       = 0x84C7;
    WebGLRenderingContext.prototype.TEXTURE8                       = 0x84C8;
    WebGLRenderingContext.prototype.TEXTURE9                       = 0x84C9;
    WebGLRenderingContext.prototype.TEXTURE10                      = 0x84CA;
    WebGLRenderingContext.prototype.TEXTURE11                      = 0x84CB;
    WebGLRenderingContext.prototype.TEXTURE12                      = 0x84CC;
    WebGLRenderingContext.prototype.TEXTURE13                      = 0x84CD;
    WebGLRenderingContext.prototype.TEXTURE14                      = 0x84CE;
    WebGLRenderingContext.prototype.TEXTURE15                      = 0x84CF;
    WebGLRenderingContext.prototype.TEXTURE16                      = 0x84D0;
    WebGLRenderingContext.prototype.TEXTURE17                      = 0x84D1;
    WebGLRenderingContext.prototype.TEXTURE18                      = 0x84D2;
    WebGLRenderingContext.prototype.TEXTURE19                      = 0x84D3;
    WebGLRenderingContext.prototype.TEXTURE20                      = 0x84D4;
    WebGLRenderingContext.prototype.TEXTURE21                      = 0x84D5;
    WebGLRenderingContext.prototype.TEXTURE22                      = 0x84D6;
    WebGLRenderingContext.prototype.TEXTURE23                      = 0x84D7;
    WebGLRenderingContext.prototype.TEXTURE24                      = 0x84D8;
    WebGLRenderingContext.prototype.TEXTURE25                      = 0x84D9;
    WebGLRenderingContext.prototype.TEXTURE26                      = 0x84DA;
    WebGLRenderingContext.prototype.TEXTURE27                      = 0x84DB;
    WebGLRenderingContext.prototype.TEXTURE28                      = 0x84DC;
    WebGLRenderingContext.prototype.TEXTURE29                      = 0x84DD;
    WebGLRenderingContext.prototype.TEXTURE30                      = 0x84DE;
    WebGLRenderingContext.prototype.TEXTURE31                      = 0x84DF;
    WebGLRenderingContext.prototype.ACTIVE_TEXTURE                 = 0x84E0;
    
    /* TextureWrapMode */
    WebGLRenderingContext.prototype.REPEAT                         = 0x2901;
    WebGLRenderingContext.prototype.CLAMP_TO_EDGE                  = 0x812F;
    WebGLRenderingContext.prototype.MIRRORED_REPEAT                = 0x8370;
    
    /* Uniform Types */
    WebGLRenderingContext.prototype.FLOAT_VEC2                     = 0x8B50;
    WebGLRenderingContext.prototype.FLOAT_VEC3                     = 0x8B51;
    WebGLRenderingContext.prototype.FLOAT_VEC4                     = 0x8B52;
    WebGLRenderingContext.prototype.INT_VEC2                       = 0x8B53;
    WebGLRenderingContext.prototype.INT_VEC3                       = 0x8B54;
    WebGLRenderingContext.prototype.INT_VEC4                       = 0x8B55;
    WebGLRenderingContext.prototype.BOOL                           = 0x8B56;
    WebGLRenderingContext.prototype.BOOL_VEC2                      = 0x8B57;
    WebGLRenderingContext.prototype.BOOL_VEC3                      = 0x8B58;
    WebGLRenderingContext.prototype.BOOL_VEC4                      = 0x8B59;
    WebGLRenderingContext.prototype.FLOAT_MAT2                     = 0x8B5A;
    WebGLRenderingContext.prototype.FLOAT_MAT3                     = 0x8B5B;
    WebGLRenderingContext.prototype.FLOAT_MAT4                     = 0x8B5C;
    WebGLRenderingContext.prototype.SAMPLER_2D                     = 0x8B5E;
    WebGLRenderingContext.prototype.SAMPLER_CUBE                   = 0x8B60;
    
    /* Vertex Arrays */
    WebGLRenderingContext.prototype.VERTEX_ATTRIB_ARRAY_ENABLED        = 0x8622;
    WebGLRenderingContext.prototype.VERTEX_ATTRIB_ARRAY_SIZE           = 0x8623;
    WebGLRenderingContext.prototype.VERTEX_ATTRIB_ARRAY_STRIDE         = 0x8624;
    WebGLRenderingContext.prototype.VERTEX_ATTRIB_ARRAY_TYPE           = 0x8625;
    WebGLRenderingContext.prototype.VERTEX_ATTRIB_ARRAY_NORMALIZED     = 0x886A;
    WebGLRenderingContext.prototype.VERTEX_ATTRIB_ARRAY_POINTER        = 0x8645;
    WebGLRenderingContext.prototype.VERTEX_ATTRIB_ARRAY_BUFFER_BINDING = 0x889F;
    
    /* Shader Source */
    WebGLRenderingContext.prototype.COMPILE_STATUS                 = 0x8B81;
    
    /* Shader Precision-Specified Types */
    WebGLRenderingContext.prototype.LOW_FLOAT                      = 0x8DF0;
    WebGLRenderingContext.prototype.MEDIUM_FLOAT                   = 0x8DF1;
    WebGLRenderingContext.prototype.HIGH_FLOAT                     = 0x8DF2;
    WebGLRenderingContext.prototype.LOW_INT                        = 0x8DF3;
    WebGLRenderingContext.prototype.MEDIUM_INT                     = 0x8DF4;
    WebGLRenderingContext.prototype.HIGH_INT                       = 0x8DF5;
    
    /* Framebuffer Object. */
    WebGLRenderingContext.prototype.FRAMEBUFFER                    = 0x8D40;
    WebGLRenderingContext.prototype.RENDERBUFFER                   = 0x8D41;
    
    WebGLRenderingContext.prototype.RGBA4                          = 0x8056;
    WebGLRenderingContext.prototype.RGB5_A1                        = 0x8057;
    WebGLRenderingContext.prototype.RGB565                         = 0x8D62;
    WebGLRenderingContext.prototype.DEPTH_COMPONENT16              = 0x81A5;
    WebGLRenderingContext.prototype.STENCIL_INDEX                  = 0x1901;
    WebGLRenderingContext.prototype.STENCIL_INDEX8                 = 0x8D48;
    WebGLRenderingContext.prototype.DEPTH_STENCIL                  = 0x84F9;
    
    WebGLRenderingContext.prototype.RENDERBUFFER_WIDTH             = 0x8D42;
    WebGLRenderingContext.prototype.RENDERBUFFER_HEIGHT            = 0x8D43;
    WebGLRenderingContext.prototype.RENDERBUFFER_INTERNAL_FORMAT   = 0x8D44;
    WebGLRenderingContext.prototype.RENDERBUFFER_RED_SIZE          = 0x8D50;
    WebGLRenderingContext.prototype.RENDERBUFFER_GREEN_SIZE        = 0x8D51;
    WebGLRenderingContext.prototype.RENDERBUFFER_BLUE_SIZE         = 0x8D52;
    WebGLRenderingContext.prototype.RENDERBUFFER_ALPHA_SIZE        = 0x8D53;
    WebGLRenderingContext.prototype.RENDERBUFFER_DEPTH_SIZE        = 0x8D54;
    WebGLRenderingContext.prototype.RENDERBUFFER_STENCIL_SIZE      = 0x8D55;
    
    WebGLRenderingContext.prototype.FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE           = 0x8CD0;
    WebGLRenderingContext.prototype.FRAMEBUFFER_ATTACHMENT_OBJECT_NAME           = 0x8CD1;
    WebGLRenderingContext.prototype.FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL         = 0x8CD2;
    WebGLRenderingContext.prototype.FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE = 0x8CD3;
    
    WebGLRenderingContext.prototype.COLOR_ATTACHMENT0              = 0x8CE0;
    WebGLRenderingContext.prototype.DEPTH_ATTACHMENT               = 0x8D00;
    WebGLRenderingContext.prototype.STENCIL_ATTACHMENT             = 0x8D20;
    WebGLRenderingContext.prototype.DEPTH_STENCIL_ATTACHMENT       = 0x821A;
    
    WebGLRenderingContext.prototype.NONE                           = 0;
    
    WebGLRenderingContext.prototype.FRAMEBUFFER_COMPLETE                      = 0x8CD5;
    WebGLRenderingContext.prototype.FRAMEBUFFER_INCOMPLETE_ATTACHMENT         = 0x8CD6;
    WebGLRenderingContext.prototype.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT = 0x8CD7;
    WebGLRenderingContext.prototype.FRAMEBUFFER_INCOMPLETE_DIMENSIONS         = 0x8CD9;
    WebGLRenderingContext.prototype.FRAMEBUFFER_UNSUPPORTED                   = 0x8CDD;
    
    WebGLRenderingContext.prototype.FRAMEBUFFER_BINDING            = 0x8CA6;
    WebGLRenderingContext.prototype.RENDERBUFFER_BINDING           = 0x8CA7;
    WebGLRenderingContext.prototype.MAX_RENDERBUFFER_SIZE          = 0x84E8;
    
    WebGLRenderingContext.prototype.INVALID_FRAMEBUFFER_OPERATION  = 0x0506;
    
    /* WebGL-specific enums */
    WebGLRenderingContext.prototype.UNPACK_FLIP_Y_WEBGL            = 0x9240;
    WebGLRenderingContext.prototype.UNPACK_PREMULTIPLY_ALPHA_WEBGL = 0x9241;
    WebGLRenderingContext.prototype.CONTEXT_LOST_WEBGL             = 0x9242;
    WebGLRenderingContext.prototype.UNPACK_COLORSPACE_CONVERSION_WEBGL = 0x9243;
    WebGLRenderingContext.prototype.BROWSER_DEFAULT_WEBGL          = 0x9244;
    
    return exports;
    
})();