# cs320-org-chart

## Setting up the flask application

* Make sure python 3.8 is installed, and figure out your python 3.8 command.
* Navigate to backend/ and run "{pythoncommand} -m venv .venv". If this fails, you may need to install venv.
* Activate the virtual environment
    - cmd.exe: C:\> .venv\Scripts\activate.bat
    - PowerShell (windows): PS C:\> .venv\Scripts\Activate.ps1
    - bash/zsh: $ source .venv/bin/activate
    - other shells: see https://docs.python.org/3/library/venv.html
* Ensure that you are in the venv (should have venv in front of your shell prompt).
* Run "python -m pip install -r requirements.txt".
* Examine ENV_FILE_INSTRUCTIONS file for instructions on creating backend/.env file.
* Install Mongodb and make sure mongod service is running.
* Navigate to mongodbStuff directory.
* run "{pythoncommand} importJSON.py" to initialize the database
* Navigate to backend directory. If you are using Unix, run "./run.sh". If you're on Windows, run "run.bat".
* The app should launch on **localhost:5000**.

