# Team Runtime Terror Org-chart Project

## Setting up the Flask application

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
* Install MongoDB and make sure mongod service is running.
* Run "{pythoncommand} importJSON.py" to initialize the database
* Navigate to backend directory. If you are using Unix, run "./run.sh". If you're on Windows, run "run.bat".
* The app should launch on **localhost:5000**.



## Setting up Frontend

* In the app directory in frontend, add a file ".env" and add the line "SKIP_PREFLIGHT_CHECK=true"
* Run "yarn install" in the cs320-org-chart directory, the frontend directory, and in the app directory.
* In the app directory execute "yarn add @unicef/react-org-chart" and then in this same directory run "yarn start".


