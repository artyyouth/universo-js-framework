Debug.enabled = true;

function printArray(arr)
{
    var len = arr.length;
    Debug.log("length = " + len);
    Debug.log("byteLength = " + arr.byteLength);
    Debug.log("byteOffset = " + arr.byteOffset);
    
    Debug.log("values: [");
    for(var i = 0; i < len; i++)
    {
        Debug.log(i + " : " + arr[i]);
    }
    Debug.log("]");
}

var i8a = new cInt8Array(20);

i8a.length = 30;
i8a.byteLength = 40;

i8a[2] = 3;

printArray(i8a);

var i32a = new cInt32Array(i8a);

printArray(i32a);

/*
var sa = i8a.subarray(18);
printArray(sa);
sa[0] = 1;
printArray(sa);
printArray(i8a);
*/