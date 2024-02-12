В Dev Environment:
---------------------------------------------------------------------------------------

1. Установить nginx:
	1.1. Устанавливаем пререквизиты: 
		sudo yum install yum-utils
	1.1. Создаём файл: sudo nano /etc/yum.repos.d/nginx.repo, который содержит:
		[nginx-stable]
		name=nginx stable repo
		baseurl=http://nginx.org/packages/centos/$releasever/$basearch/
		gpgcheck=1
		enabled=1
		gpgkey=https://nginx.org/keys/nginx_signing.key
		module_hotfixes=true

		[nginx-mainline]
		name=nginx mainline repo
		baseurl=http://nginx.org/packages/mainline/centos/$releasever/$basearch/
		gpgcheck=1
		enabled=0
		gpgkey=https://nginx.org/keys/nginx_signing.key
		module_hotfixes=true
	1.2. Устанавливаем приложение:
		sudo yum -y install nginx
	1.3. После установки:
		sudo systemctl enable nginx
		sudo firewall-cmd --permanent --zone=public --add-port=80/tcp
		sudo firewall-cmd --reload
	1.4. Проверяем установку:
		nginx -v
		ps -ef | grep nginx
	1.5. Отключаем default конфигурацию, закомментив все строчки в /etc/nginx/conf.d/default.conf
	1.6. Создаём пользователя nginx_usr, добавляя его в группы tim и nginx
		sudo useradd -M -G tim,nginx nginx_usr
			Задаём пароль (из файла .env):
		sudo passwd nginx_usr
	1.7. Проверяем, установлено ли для наших папок: httpd_enable_homedirs
		getsebool -a | grep httpd
	     Если httpd_enable_homedirs --> off, то
	     	sudo setsebool -P httpd_enable_homedirs 1
	1.8. Заставляем nginx работать с нашей конфигурацией:
		sudo nginx -c /var/www/tricky/cfg/nginx.conf
		sudo systemctl -reload nginx
			или
		sudo nginx -s reload -c /var/www/tricky/cfg/nginx.conf
		sudo systemctl start nginx -c /var/www/tricky/cfg/nginx.conf
2. Устанавливаем NodeJS:
	2.1. Сначала устанавливаем Development Tools:
		sudo dnf groupinstall "Development Tools"
	2.2. Устанавливаем NodeJS:
		sudo dnf install -y nodejs
	2.3. Проверяем установку:
		node --version
		npm --version
	2.4. Создаём папку проекта и присваиваем её:
		cd /var/
		sudo mkdir www
		cd /var/www/
		sudo mkdir tricky
		sudo chown tim:tim tricky
3. Включаем поддержку Typescript:
	3.1. Устанавливаем в папке проекта:
		npm install typescript --save-dev
4. Устанавливаем VS Code:
	4.1. Добавляем ключ от Майкрософт:
		sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc
	4.2. Добавляем репозиторий:
		sudo nano /etc/yum.repos.d/vscode.repo
	4.3. Сохраняем в нём:
		[code]
		name=Visual Studio Code
		baseurl=https://packages.microsoft.com/yumrepos/vscode
		enabled=1
		gpgcheck=1
		gpgkey=https://packages.microsoft.com/keys/microsoft.asc
	4.4. Устанавливаем VS Code:
		sudo yum install code
5. Устанавливаем MongoDB:
	5.1. Создаём файл: sudo nano /etc/yum.repos.d/mongodb-org-7.0.repo репозитория, который содержит:
		[mongodb-org-7.0]
		name=MongoDB Repository
		baseurl=https://repo.mongodb.org/yum/redhat/9/mongodb-org/7.0/x86_64/
		gpgcheck=1
		enabled=1
		gpgkey=https://www.mongodb.org/static/pgp/server-7.0.asc
	5.2. Устанавливаем:
		sudo dnf install -y mongodb-org
	5.3. После установки:
		sudo systemctl start mongod
		sudo systemctl enable mongod
		sudo systemctl status mongod
	5.4. Задаём путь к своему файлу конфигурации:
		mongod --config /var/www/tricky/cfg/mongod.conf
		sudo systemctl reload mongod
	5.5. Проверяем работу в оболочке:
		mongosh 
		> use admin
		> show users
6. Инициализируем git в папке /var/www/tricky:
		git init
	6.1. Добавляем репозиторий проекта:
		git remote add origin https://github.com/tim-timoff/tricky-dev 
7. Управляем пользователем ngnix_usr:
	3.1. Добавляем пользователя:
		sudo adduser nginx_usr
	3.2. Добавляем его в группу nginx:
		sudo usermod -aG nginx nginx_usr
	3.3. Даём права на папку с сервером:
		cd /var/www/tricky
		sudo setfacl -m g:nginx:rw html img vid
	3.4. Убираем лишние права:
		sudo setfacl -m o:r-- html img vid
		
			 
