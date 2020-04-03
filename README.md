# Как выписать репозиторий с github
git clone git@github.com:devlabuser/sharp.git ./
_____________________________________________________________________________
Как выписать ветку с github
С помощью команды "checkout" можно выписать уже существующую ветку с github:

$ git checkout -b dev origin/dev
$ git checkout -b project_branch origin/project_branch


$ git checkout -b dev origin/dev
$ git checkout -b project_branch origin/project_branch
Или так, что намного надежнее:

$ git checkout --track origin/production

$ git checkout --track origin/production
Если команда не сработала, нужно попробовать выполнить обновление:

$ git remote update

$ git remote update
Если вышеприведенные команды не сработали, выдали ошибку, и времени разбираться с ней нет, можно попробовать получить нужную ветку следующим способом:

git checkout -b project_branch
git pull origin project_branch


git checkout -b project_branch
git pull origin project_branch
Т.е. сначала мы создаем новую ветку, а затем вливаем в нее изменения из ветки на github.

___________________________________________________________________________________________
Как создать новую ветку в локальном репозитории
Создаем новую ветку в локальном репозитории:
$ git checkout -b dev
Switched to a new branch 'dev'


$ git checkout -b dev
Switched to a new branch 'dev'
Публикуем ее на github:
$ git push origin dev
Total 0 (delta 0), reused 0 (delta 0)
To git@github.com:devlabuser/sharp.git
 * [new branch]      dev -> dev

$ git push origin dev
Total 0 (delta 0), reused 0 (delta 0)
To git@github.com:devlabuser/sharp.git
 * [new branch]      dev -> dev
 
 __________________________________________________________________________________________
 Как переключиться на другую ветку в git
$ git checkout project2_branch

$ git checkout project2_branch
Если вы случайно удалили какой-то файл, можно извлечь его из хранилища:

$ git checkout readme.txt

$ git checkout readme.txt

___________________________________________________________________________________________
Как посмотреть список веток
Команда "branch" позволяет посмотреть список веток в локальном репозитории. Текущая ветка будет помечена звездочкой:

$ git branch
* dev
  master
$ git branch
* dev
  master
  
  ________________________________________________________________________________________
  
  Как сделать commit
Создаем новую ветку, выполняем в ней нужные изменения.

Список всех измененных и добавленных файлов можно просмотреть командой:
$ git status

$ git status
Подготавливаем коммит, добавляя в него файлы командой:
$ git add <file1> <file2> ...

$ git add <file1> <file2> ...
Или удаляем устаревшие файлы:

$ git rm <file1> <file2> ...

$ git rm <file1> <file2> ...
Выполняем коммит:
$ git commit -m 'Комментарий к коммиту'

$ git commit -m 'Комментарий к коммиту'
Как правило, в репозитории существует две основные ветки - dev и master. Dev - общая ветка разработчиков и тестировщиков. Именно в нее добавляются все новые разработки перед очередным релизом. Master - ветка для выкладки продукта на боевые сервера.

После коммита надо влить в нашу ветку изменения из ветки dev и master:
$ git pull origin dev 
$ git pull origin master


$ git pull origin dev 
$ git pull origin master
Теперь наша ветка содержит изменения для проекта, и все последние изменения по другим задачам, которые успела внести команда.

Переключаемся на ветку dev:
$ git checkout dev

$ git checkout dev
Вливаем в dev изменения из ветки проекта:
$ git merge project_branch

$ git merge project_branch
Заливаем последнюю версию ветки dev на удаленный сервер:
$ git push origin dev

Counting objects: 4, done.
Delta compression using up to 2 threads.
Compressing objects: 100% (2/2), done.
Writing objects: 100% (3/3), 286 bytes, done.
Total 3 (delta 0), reused 0 (delta 0)
To git@github.com:devlab/sharp.git
   d528335..9a452d9  dev -> dev
$ git push origin dev
 
Counting objects: 4, done.
Delta compression using up to 2 threads.
Compressing objects: 100% (2/2), done.
Writing objects: 100% (3/3), 286 bytes, done.
Total 3 (delta 0), reused 0 (delta 0)
To git@github.com:devlab/sharp.git
   d528335..9a452d9  dev -> dev
push может не пройти, потому что удалённый origin/dev обогнал локальную его копию.

_____________________________________________________________________________________________
Как посмотреть историю изменений
git log - просмотр логов.

$ git log
commit 9a452d9cdbdb57e7e4f2b09f8ce2f776cd56657a
Author: DevLab User <user@mail.ru>
Date:   Wed Jul 31 18:35:47 2013 +0400

    first commit

commit d528335724dfc15461996ed9d44d74f23ce6a075
Author: DevLab User <user@mail.ru>
Date:   Wed Jul 31 06:24:57 2013 -0700

    Initial commit
$ git log
commit 9a452d9cdbdb57e7e4f2b09f8ce2f776cd56657a
Author: DevLab User <user@mail.ru>
Date:   Wed Jul 31 18:35:47 2013 +0400
 
    first commit
 
commit d528335724dfc15461996ed9d44d74f23ce6a075
Author: DevLab User <user@mail.ru>
Date:   Wed Jul 31 06:24:57 2013 -0700
 
    Initial commit
Вывод данных о каждом коммите в одну строку:

git log --pretty=oneline

9a452d9cdbdb57e7e4f2b09f8ce2f776cd56657a first commit
d528335724dfc15461996ed9d44d74f23ce6a075 Initial commit
git log --pretty=oneline
 
9a452d9cdbdb57e7e4f2b09f8ce2f776cd56657a first commit
d528335724dfc15461996ed9d44d74f23ce6a075 Initial commit
Для вывода информации git log использует просмотрщик, указанный в конфиге репозитория.

Поиск по ключевому слову в комментариях к коммиту:

$ git log | grep -e "first"
    first commit


$ git log | grep -e "first"
    first commit
Команда "git show" позволяет просмотреть, какие именно изменения произошли в указанном коммите:

$ git show 99452d955bdb57e7e4f2b09f8ce2fbb6cd56377a

commit 99452d955bdb57e7e4f2b09f8ce2fbb6cd56377a
Author: DevLab User <user@mail.ru>
Date:   Wed Jul 31 18:35:47 2013 +0400

    first commit

diff --git a/readme.txt b/readme.txt
new file mode 100644
index 0000000..4add785
--- /dev/null
+++ b/readme.txt
@@ -0,0 +1 @@
+Text
\ No newline at end of file
$ git show 99452d955bdb57e7e4f2b09f8ce2fbb6cd56377a
 
commit 99452d955bdb57e7e4f2b09f8ce2fbb6cd56377a
Author: DevLab User <user@mail.ru>
Date:   Wed Jul 31 18:35:47 2013 +0400
 
    first commit
 
diff --git a/readme.txt b/readme.txt
new file mode 100644
index 0000000..4add785
--- /dev/null
+++ b/readme.txt
@@ -0,0 +1 @@
+Text
\ No newline at end of file
Можно посмотреть построчную информацию о последнем коммите, имя автора и хэш коммита:

$ git blame README.md

^d528335 (devlabuser 2013-07-31 06:24:57 -0700 1) sharp
^d528335 (devlabuser 2013-07-31 06:24:57 -0700 2) =====

$ git blame README.md
 
^d528335 (devlabuser 2013-07-31 06:24:57 -0700 1) sharp
^d528335 (devlabuser 2013-07-31 06:24:57 -0700 2) =====
git annotate, выводит измененные строки и информацию о коммитах, где это произошло:

$ git annotate readme.txt
9a452d9c        (DevLab User      2013-07-31 18:35:47 +0400       1)Text


$ git annotate readme.txt
9a452d9c        (DevLab User      2013-07-31 18:35:47 +0400       1)Text

_________________________________________________________________________________________

Как сделать откат
git log - просмотр логов, показывает дельту (разницу/diff), привнесенную каждым коммитом.
commit 9a452d9cdbdb57e7e4f2b09f8ce2f776cd56657a
Author: devlabuser <user@mail.ru>
Date:   Wed Jul 31 18:35:47 2013 +0400

    first commit

commit d528335724dfc15461996ed9d44d74f23ce6a075
Author: devlabuser <user@mail.ru>
Date:   Wed Jul 31 06:24:57 2013 -0700

    Initial commit

commit 9a452d9cdbdb57e7e4f2b09f8ce2f776cd56657a
Author: devlabuser <user@mail.ru>
Date:   Wed Jul 31 18:35:47 2013 +0400
 
    first commit
 
commit d528335724dfc15461996ed9d44d74f23ce6a075
Author: devlabuser <user@mail.ru>
Date:   Wed Jul 31 06:24:57 2013 -0700
 
    Initial commit
Копируем идентификатор коммита, до которого происходит откат.
Откатываемся до последнего успешного коммита (указываем последний коммит):
$ git reset --hard 9a452d955bdb57e7e4f2b09f8ce2fbb6cd56377a
HEAD is now at 9a45779 first commit

$ git reset --hard 9a452d955bdb57e7e4f2b09f8ce2fbb6cd56377a
HEAD is now at 9a45779 first commit

Можно откатить до последней версии ветки:
$ git reset --hard origin/dev
HEAD is now at 9a45779 first commit

$ git reset --hard origin/dev
HEAD is now at 9a45779 first commit
После того, как откат сделан, и выполнен очередной локальный коммит, при попытке сделать push в удаленный репозиторий, git может начать ругаться, что версия вашей ветки младше чем на github и вам надо сделать pull. Это лечится принудительным коммитом:

git push -f origin master

git push -f origin master

_____________________________________________________________________________
Как выполнить слияние с другой веткой
git merge выполняет слияние текущей и указанной ветки. Изменения добавляются в текущую ветку.

$ git merge origin/ticket_1001_branch

$ git merge origin/ticket_1001_branch
git pull забирает изменения из ветки на удаленном сервере и проводит слияние с активной веткой.

$ git pull origin ticket_1001_branch

$ git pull origin ticket_1001_branch
_____________________________________________________________________________

Создание нового локального репозитория
$ mkdir project_dir
$ cd project_dir
$ git init

$ mkdir project_dir
$ cd project_dir
$ git init
 

git cherry-pick
git cherry-pick помогает применить один-единственный коммит из одной ветки к дереву другой.

Для этого нужно выписать ветку, в которую будем вливать коммит:
git checkout master

git checkout master
Обновить ее:
git pull origin master

git pull origin master
Выполнить команду, указать код коммита:
git cherry-pick eb042098a5

git cherry-pick eb042098a5
После этого обновить ветку на сервере:
git push origin master

git push origin master

________________________________________________________________________

Как раскрасить команды git
После создания репозитория в текущей директории появится субдиректория .git . Она содержит файл config .

[core]
        repositoryformatversion = 0
        filemode = true
        bare = false
        logallrefupdates = true
[remote "origin"]
        fetch = +refs/heads/*:refs/remotes/origin/*
        url = git@github.com:devlab/sharp.git
[branch "master"]
        remote = origin
        merge = refs/heads/master
[branch "dev"]
        remote = origin
        merge = refs/heads/dev

[core]
        repositoryformatversion = 0
        filemode = true
        bare = false
        logallrefupdates = true
[remote "origin"]
        fetch = +refs/heads/*:refs/remotes/origin/*
        url = git@github.com:devlab/sharp.git
[branch "master"]
        remote = origin
        merge = refs/heads/master
[branch "dev"]
        remote = origin
        merge = refs/heads/dev
Чтобы раскрасить вывод git, можно добавить в файл блок [color]:

[color]
        branch = auto
        diff = auto
        interactive = auto
        status = auto
        ui = auto

[color]
        branch = auto
        diff = auto
        interactive = auto
        status = auto
        ui = auto
