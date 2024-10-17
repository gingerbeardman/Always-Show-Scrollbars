let disposable;

exports.activate = function() {
    // Register the command
    nova.commands.register("run-terminal-command", runCommand);

    // Set up a listener for configuration changes
    disposable = nova.config.onDidChange("com.gingerbeardman.ToggleScrollbars.enableAutoRun", (newValue, oldValue) => {
        if (newValue === true) {
            runCommand("defaults write com.panic.Nova AppleShowScrollBars Always");
        } else {
            runCommand("defaults delete com.panic.Nova AppleShowScrollBars");
        }
    });
}

exports.deactivate = function() {
    if (disposable) {
        disposable.dispose();
    }
}

function setDefaultConfigValue() {
    const process = new Process("/usr/bin/env", {
        args: ["zsh", "-c", "defaults read com.panic.Nova AppleShowScrollBars | grep -q Always && echo true || echo false"],
        shell: true
    });
    
    let output = "";
    process.onStdout(function(line) {
        output += line.trim();
    });
    
    process.start();
    
    process.onDidExit(function(status) {
        if (status === 0 && output) {
            const defaultValue = output === "true";
            if (!nova.config.get("com.gingerbeardman.ToggleScrollbars.enableAutoRun")) {
                nova.config.set("com.gingerbeardman.ToggleScrollbars.enableAutoRun", defaultValue);
            }
        } else {
            console.error("Failed to get default value from command");
        }
    });
}

function runCommand(toggle) {
    // Create a process object
    const process = new Process("/usr/bin/env", {
        args: ["zsh", "-c", toggle],
        shell: true
    });
    
    // Set up output handling
    let stdoutData = "";
    process.onStdout(function(line) {
        stdoutData += line;
    });
    
    let stderrData = "";
    process.onStderr(function(line) {
        stderrData += line;
    });
    
    // Start the process
    process.start();
    
    // Wait for the process to finish
    process.onDidExit(function(status) {
        if (status === 0) {
            console.log("Command executed successfully: " + stdoutData)
            // nova.workspace.showInformativeMessage("Command executed successfully: " + stdoutData);
        } else {
            console.error("Command failed: " + stderrData)
            // nova.workspace.showErrorMessage("Command failed: " + stderrData);
        }
    });
}