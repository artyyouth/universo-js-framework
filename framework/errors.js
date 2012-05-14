function IndexSizeError(message)
{
    this.name = "IndexSizeError";
    this.message = message || "IndexSizeError";
}
IndexSizeError.prototype = new Error();
IndexSizeError.prototype.constructor = IndexSizeError;

function NotSupportedError(message)
{
    this.name = "NotSupportedError";
    this.message = message || "NotSupportedError";
}
NotSupportedError.prototype = new Error();
NotSupportedError.prototype.constructor = NotSupportedError;

function InvalidParameterError(message)
{
    this.name = "InvalidParameterError";
    this.message = message || "InvalidParameterError";
}
InvalidParameterError.prototype = new Error();
InvalidParameterError.prototype.constructor = InvalidParameterError;

function UninitializedError(message)
{
    this.name = "UninitializedError";
    this.message = message || "UninitializedError";
}
UninitializedError.prototype = new Error();
UninitializedError.prototype.constructor = UninitializedError;

function SyntaxError(message)
{
    this.name = "SyntaxError";
    this.message = message || "SyntaxError";
}
SyntaxError.prototype = new Error();
SyntaxError.prototype.constructor = SyntaxError;

function InvalidStateError(message)
{
    this.name = "InvalidStateError";
    this.message = message || "InvalidStateError";
}
InvalidStateError.prototype = new Error();
InvalidStateError.prototype.constructor = InvalidStateError;