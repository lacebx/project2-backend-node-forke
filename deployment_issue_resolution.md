# Deployment Issue Resolution

## Issue Description
During the GitHub Actions deployment workflow, the process was failing due to a file path mismatch between the workflow configuration and the actual repository structure. The main error was:

```bash
rsync: [sender] link_stat "/home/runner/work/project2-backend-node-forke/project2-backend-node-forke/deploy/course-backend.service" failed: No such file or directory (2)


## Investigation Steps
1. SSH'd into the server to examine the current structure:
   ```bash
   ssh -i /home/lace/Downloads/WebServer.pem ubuntu@project2.eaglesoftwareteam.com
   ```

2. Found that the service file existed but with a different name:
   ```bash
   ls -la nodeapps/2024/project2/t8
   # Showed tutorial-backend.service instead of course-backend.service
   ```

3. Checked the systemd service status:
   ```bash
   sudo systemctl status course-backend-t8
   # Showed service was not found
   ```

## Root Causes
1. File path mismatch in GitHub Actions workflow
   - Workflow was looking for `deploy/course-backend.service`
   - Actual file was `tutorial-backend.service` in the root directory

2. Service file naming inconsistency
   - GitHub Actions was trying to use `course-backend.service`
   - Repository had `tutorial-backend.service`

## Solution
Modified the GitHub Actions workflow to match the existing repository structure instead of creating new directories:

yaml
name: Deploy to Server
uses: easingthemes/ssh-deploy@main
env:
SSH_PRIVATE_KEY: ${{ secrets.SERVER_SSH_KEY }}
ARGS: "-rltgoDzvO --delete"
SOURCE: "tutorial-backend.service" # Updated to match existing file
REMOTE_HOST: "project2.eaglesoftwareteam.com"
REMOTE_USER: ubuntu
TARGET: "nodeapps/2024/project2/t8"


## Verification Steps
1. Verify the service file exists on the server:
   ```bash
   ls -la nodeapps/2024/project2/t8/tutorial-backend.service
   ```

2. Check service status after deployment:
   ```bash
   sudo systemctl status course-backend-t8
   ```

## Lessons Learned
1. Always verify the existing file structure before creating deployment workflows
2. Maintain consistency in file naming across deployment processes
3. When possible, adapt workflows to existing structures rather than creating new ones

## Future Recommendations
1. Consider standardizing service file names across all teams
2. Add pre-deployment checks to verify file existence
3. Document the expected file structure for future team members

## Related Files
- `.github/workflows/node-deploy.yaml`
- `tutorial-backend.service`
- `/lib/systemd/system/course-backend-t8.service`
