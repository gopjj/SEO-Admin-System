import { exec } from 'child_process';

export function runPythonScript(scriptName: string, args: string[]) {
    const argsString = args.join(' ');
    return new Promise((resolve, reject) => {
        exec(`python ./src/scripts/${scriptName}.py ${argsString}`, (error, stdout, stderr) => {
            if (error) {
                reject(`执行出错: ${error}`);
                return;
            }
            if (stderr) {
                reject(`stderr: ${stderr}`);
                return;
            }
            resolve(stdout);
        });
    });
}
