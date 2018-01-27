pushd "%~dp0\src\WanVet.Micro.UserManagement.Read\"
call WanVet.Micro.UserManagement.Read.Restart.bat
pushd "%~dp0\src\WanVet.Micro.UserManagement.Write\"
call WanVet.Micro.UserManagement.Write.Restart.bat

pushd "%~dp0\src\WanVet.Micro.PetManagement.Read\"
call WanVet.Micro.PetManagement.Read.Restart.bat
pushd "%~dp0\src\WanVet.Micro.PetManagement.Write\"
call WanVet.Micro.PetManagement.Write.Restart.bat

pushd "%~dp0\src\WanVet.Micro.CalendarManagement.Read\"
call WanVet.Micro.CalendarManagement.Read.Restart.bat
pushd "%~dp0\src\WanVet.Micro.CalendarManagement.Write\"
call WanVet.Micro.CalendarManagement.Write.Restart.bat

pushd "%~dp0\src\WanVet.Micro.AppointmentManagement.Read\"
call WanVet.Micro.AppointmentManagement.Read.Restart.bat
pushd "%~dp0\src\WanVet.Micro.AppointmentManagement.Write\"
call WanVet.Micro.AppointmentManagement.Write.Restart.bat