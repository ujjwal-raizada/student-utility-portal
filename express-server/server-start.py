import platform
import os
import sys

# change cwd to express-api-server
os.chdir('./express-api-server')

current_platform = platform.system()

windows_command_dev = 'SET DEBUG=express-api-server:* & npm run devstart'
windows_command = 'SET DEBUG=express-api-server:* & npm run start'

linux_or_mac_dev = 'DEBUG=express-api-server:* & npm run devstart'
linux_or_mac = 'DEBUG=express-api-server:* & npm run start'



if ( len(sys.argv) > 1 and sys.argv[1] == '--dev'):

    print('Starting development server:')

    if (current_platform == 'Windows'):

        print('Platform detected: Windows')
        os.system(windows_command_dev)
    elif (current_platform in ['Linux', 'Darwin']):

        print('Platform detected: Linux or Mac')
        os.system(linux_or_mac_dev)
    else:
        print('Platform unsupported!')
elif (len(sys.argv) == 1):

    print('Starting server:')

    if (current_platform == 'Windows'):

        print('Platform detected: Windows')
        os.system(windows_command)
    elif (current_platform in ['Linux', 'Darwin']):

        print('Platform detected: Linux or Mac')
        os.system(linux_or_mac)
    else:
        print('Platform unsupported!')

else:
    print('Flag(s) unknown: looking for --dev flag?')

