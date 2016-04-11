Коммит файлов 

	$ git commit -m "my commit"
	$ git commit -am "my commit"

Просмотр истории коммитов
	$ git log

Визуальный просмотр логов 
	$ gitk - требует установки Linux
	$ git giu - требует установки Windows

Изменение последнего коммита
	$ git commit -m 'initial commit'
	$ git add forgotten_file
	$ git commit --amend

Отмена индексации файла
	$ git reset HEAD <файл>

Отмена изменений файла
	$ git checkout -- benchmarks.rb