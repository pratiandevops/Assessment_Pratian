const express = require('express');
const bodyParser = require("body-parser");
const compiler = require('compilex');
const cors = require('cors');
const app = express();
app.use(cors());

//--------------------glot compiler-------------
var proxy = require('http-proxy-middleware');
var glotProxy = proxy({
    target: 'https://run.glot.io/',
    headers:{'Authorization':'Token da732786-2b0d-4fd1-b218-d19064119883'},
    changeOrigin: true,
    pathRewrite: {
      '^/glotapi/': '/',
    },
  });
  app.use('/glotapi', glotProxy);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var options = { stats: true }; //prints stats on console 
compiler.init(options);

//------------ C Compiler Start ------------//
app.post('/ccompiler', (req, res) => {
    var envData = { OS: "linux", cmd: "g++", options: { timeout: 10000 } };
    code = req.body.code;
    input = req.body.arg.trim();
    var result = '';
    if (!input) {
        compiler.compileCPP(envData, code, function (data) {
            if (data.error) {
                result = { error: data.error };
            } else {
                result = { output: data.output };
            }
            return res.status(200).send(result);
        });
    }
    else {
        compiler.compileCPPWithInput(envData, code, input, function (data) {
            if (data.error) {
                result = { error: data.error };
            } else {
                result = { output: data.output };
            }
            return res.status(200).send(result);
        });
    }
});
//------------ C Compiler End ------------//


//------------ Csharp Compiler Start ------------//
app.post('/csharpcompiler', (req, res) => {
    var envData = { OS: "linux", cmd: "g++", options: { timeout: 10000 } };
    code = req.body.code;
    input = req.body.arg.trim();
    var result = '';
    if (!input) {
        compiler.compileCS(envData, code, function (data) {
            if (data.error) {
                result = { error: data.error };
            } else {
                result = { output: data.output };
            }
            return res.status(200).send(result);
        });
    }
    else {
        compiler.compileCSWithInput(envData, code, input, function (data) {
            if (data.error) {
                result = { error: data.error };
            } else {
                result = { output: data.output };
            }
            return res.status(200).send(result);
        });
    }

});
//------------ Csharp Compiler End ------------//


//------------ Python Compiler Start ------------//
app.post('/pcompiler', async (req, res) => {
    var envData = { OS: "linux" };
    code = req.body.code;
    input = req.body.arg.trim();
    var result = '';
    if (!input) {
        await compiler.compilePython(envData, code, function (data) {
            if (data.error) {
                result = { error: data.error };
            } else {
                result = { output: data.output };
            }
            return res.status(200).send(result);
        });
    }
    else {
        await compiler.compilePythonWithInput(envData, code, input, function (data) {
            if (data.error) {
                result = { error: data.error };
            } else {
                result = { output: data.output };
            }
            return res.status(200).send(result);
        });
    }
});
//------------ Python Compiler End ------------//

//------------ Java Compiler Start ------------//
app.post('/jcompiler', (req, res) => {
    var envData = { OS: "linux" };
    code = req.body.code;
    input = req.body.arg.trim();
    var result = '';
    if (!input) {
        compiler.compileJava(envData, code, function (data) {
            // res.send(data);
            if (data.error) {
                result = { error: data.error };
            } else {
                result = { output: data.output };
            }
            return res.send(result);
        });
    }
    else {
        compiler.compileJavaWithInput(envData, code, input, function (data) {
            if (data.error) {
                result = { error: data.error };
            } else {
                result = { output: data.output };
            }
            return res.status(200).send(result);
        });
    }

});
//------------ Java Compiler End ------------//

//------------ Submit the user code and the output -------------//
app.post('/submitCode', (req, res) => {
    var envData = { OS: "linux", cmd: "g++", options: { timeout: 10000 } };
    code = req.body.code;
    // input = req.body.arg.trim();
    moduleId = req.body.moduleId;
    userName = req.body.userName;
    language = req.body.language;
    var result = '';
    if (language === "C" || language === "C++") {
        compiler.compileCPPWithTestCase(envData, code, userName, language, moduleId, function (data) {
            // res.send(data);
            if (data.error) {
                result = { error: data.error };
            } else {
                var passedData = data.filter((data) => { return data.testStatus === "passed" });
                var failedData = data.filter((data) => { return data.testStatus === "failed" });
                result = { output: { passedCase: passedData.length, failedCase: failedData.length } };
            }
            return res.send(result);
        });
    }
    if (language === "C#") {
        compiler.compileCsharpWithTestCase(envData, code, userName, language, moduleId, function (data) {
            // res.send(data);
            if (data.error) {
                result = { error: data.error };
            } else {
                var passedData = data.filter((data) => { return data.testStatus === "passed" });
                var failedData = data.filter((data) => { return data.testStatus === "failed" });
                result = { output: { passedCase: passedData.length, failedCase: failedData.length } };
            }
            return res.send(result);
        });
    }
    if (language === "Java") {
        compiler.compileJavaWithTestCase(envData, code, userName, language, moduleId, function (data) {
            // res.send(data);
            if (data.error) {
                result = { error: data.error };
            } else {
                var passedData = data.filter((data) => { return data.testStatus === "passed" });
                var failedData = data.filter((data) => { return data.testStatus === "failed" });
                result = { output: { passedCase: passedData.length, failedCase: failedData.length } };
            }
            return res.send(result);
        });
    }
    if (language === "Python") {
        compiler.compilePythonWithTestCase(envData, code, userName, language, moduleId, function (data) {
            // res.send(data);
            if (data.error) {
                result = { error: data.error };
            } else {
                var passedData = data.filter((data) => { return data.testStatus === "passed" });
                var failedData = data.filter((data) => { return data.testStatus === "failed" });
                result = { output: { passedCase: passedData.length, failedCase: failedData.length } };
            }
            return res.send(result);
        });
    }
});

const PORT = process.env.PORT || 2501;
app.listen(PORT, () => {

    console.log(`Server is Running at port ${PORT}`)
});
