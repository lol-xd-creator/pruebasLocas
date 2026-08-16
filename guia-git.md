# Guía de comandos Git

Referencia para administrar un proyecto de punta a punta.
Materia: Desarrollo de Software (DDS) — UTN FRC

> **Convención:** lo que va entre `<corchetes angulares>` se reemplaza por tu valor.
> Ejemplo: `git checkout <rama>` → `git checkout main`

---

## 1. Configuración inicial

Se hace una sola vez por máquina.

```bash
git config --global user.name "Tu Nombre"       # firma de tus commits
git config --global user.email "tu@email.com"   # usá el mismo mail de GitHub
git config --global init.defaultBranch main     # que los repos nuevos usen "main"
git config --global core.editor "code --wait"   # VS Code como editor por defecto

git config --list                # ver toda la configuración activa
git config user.email            # consultar un valor puntual
```

En Windows, para evitar problemas de fin de línea (CRLF vs LF):

```bash
git config --global core.autocrlf true
```

---

## 2. Crear o clonar un repositorio

```bash
git init                                    # inicializa un repo en la carpeta actual
git init <nombre-carpeta>                   # crea la carpeta y la inicializa

git clone <url>                             # copia un repo remoto
git clone <url> <carpeta-destino>           # y lo pone en la carpeta que indiques
git clone --depth 1 <url>                   # solo el último commit (descarga liviana)
```

---

## 3. El ciclo básico de trabajo

Este es el 90% del uso diario.

```bash
git status                       # qué cambió, qué está preparado, en qué rama estoy
git status -s                    # versión compacta

git add <archivo>                # prepara un archivo para el commit
git add .                        # prepara todo lo modificado
git add -p                       # elige interactivamente qué trozos incluir

git commit -m "mensaje"          # confirma lo preparado
git commit -am "mensaje"         # add + commit (solo archivos ya rastreados)

git push                         # sube los commits al remoto
git pull                         # trae y fusiona cambios del remoto
```

### Los tres estados

| Estado | Dónde está | Cómo llegó |
|---|---|---|
| **Working directory** | tus archivos en disco | lo editaste |
| **Staging area (index)** | preparado para commitear | `git add` |
| **Repository** | historial permanente | `git commit` |

---

## 4. Ver el historial

```bash
git log                          # historial completo
git log --oneline                # una línea por commit
git log --oneline --graph --all  # árbol visual con todas las ramas
git log -n 5                     # últimos 5 commits
git log --author="Benja"         # filtrar por autor
git log --since="2 weeks ago"    # filtrar por fecha
git log -p <archivo>             # historial con los cambios de un archivo
git log --stat                   # resumen de archivos tocados por commit

git show <hash>                  # detalle completo de un commit
git blame <archivo>              # quién escribió cada línea y en qué commit
```

---

## 5. Ver diferencias

```bash
git diff                         # cambios sin preparar (working vs staging)
git diff --staged                # cambios preparados (staging vs último commit)
git diff HEAD                    # todo lo no commiteado
git diff <rama1> <rama2>         # diferencias entre dos ramas
git diff <hash1> <hash2>         # diferencias entre dos commits
git diff --name-only             # solo los nombres de archivos afectados
```

---

## 6. Ramas (branches)

```bash
git branch                       # listar ramas locales
git branch -a                    # incluir ramas remotas
git branch -v                    # con el último commit de cada una

git branch <nombre>              # crear rama (sin cambiarse a ella)
git switch <rama>                # cambiar de rama
git switch -c <rama>             # crear y cambiar en un paso
git checkout <rama>              # forma clásica de cambiar (equivale a switch)
git checkout -b <rama>           # forma clásica de crear y cambiar

git branch -m <nuevo-nombre>     # renombrar la rama actual
git branch -d <rama>             # borrar rama ya fusionada
git branch -D <rama>             # forzar borrado (cuidado: pierde commits)
```

> `switch` y `restore` son los comandos modernos; `checkout` hace ambas cosas y por eso
> resulta confuso. Se recomienda usar los nuevos, pero vas a ver `checkout` en todos lados.

### Fusionar ramas

```bash
git merge <rama>                 # trae <rama> a la rama actual
git merge --no-ff <rama>         # fuerza un commit de merge (conserva la historia)
git merge --abort                # cancelar un merge con conflictos

git rebase <rama>                # reaplica tus commits sobre <rama> (historia lineal)
git rebase --continue            # seguir tras resolver un conflicto
git rebase --abort               # cancelar el rebase
```

> **Regla de oro:** nunca hagas rebase de commits que ya subiste y que otros
> puedan haber descargado. Reescribe la historia y rompe el repo de tus compañeros.

---

## 7. Repositorios remotos

```bash
git remote -v                                # ver remotos configurados
git remote add origin <url>                  # vincular con un remoto
git remote remove origin                     # desvincular
git remote set-url origin <url-nueva>        # cambiar la URL
git remote show origin                       # detalle del remoto

git push -u origin main                      # primer push (establece el vínculo)
git push                                     # pushes siguientes
git push origin <rama>                       # subir una rama específica
git push origin --delete <rama>              # borrar una rama del remoto
git push --tags                              # subir las etiquetas

git fetch                                    # traer cambios SIN fusionar
git pull                                     # fetch + merge
git pull --rebase                            # fetch + rebase (historia más limpia)
```

> `fetch` es seguro: solo actualiza tu conocimiento del remoto.
> `pull` modifica tu working directory. Cuando dudes, hacé `fetch` y mirá con `git log`.

---

## 8. Deshacer cosas

Ordenado de menos a más destructivo.

```bash
# Descartar cambios NO preparados de un archivo
git restore <archivo>
git checkout -- <archivo>              # forma clásica

# Sacar un archivo del staging (sin perder los cambios)
git restore --staged <archivo>
git reset HEAD <archivo>               # forma clásica

# Corregir el último commit (mensaje o contenido)
git commit --amend -m "mensaje corregido"

# Deshacer commits manteniendo los cambios en el working directory
git reset --soft HEAD~1                # el commit desaparece, los cambios quedan staged
git reset --mixed HEAD~1               # los cambios quedan sin preparar (por defecto)

# Deshacer commits y BORRAR los cambios
git reset --hard HEAD~1                # ⚠️ irreversible sobre lo no commiteado
git reset --hard <hash>                # volver a un commit puntual

# Revertir un commit creando uno nuevo que lo anula (seguro para historia compartida)
git revert <hash>

# Recuperar algo que creías perdido
git reflog                             # historial de TODOS los movimientos de HEAD
git reset --hard <hash-del-reflog>     # volver a ese punto
```

> `reflog` es tu red de seguridad. Casi nada se pierde de verdad en Git durante
> los primeros 30 días, aun después de un `reset --hard`.

---

## 9. Guardar trabajo temporalmente (stash)

Útil cuando tenés que cambiar de rama pero no querés commitear a medias.

```bash
git stash                        # guarda los cambios y limpia el working directory
git stash -u                     # incluye archivos nuevos (untracked)
git stash push -m "mensaje"      # guardar con descripción

git stash list                   # ver la pila de stashes
git stash show -p stash@{0}      # ver el contenido de uno

git stash pop                    # recupera el último y lo elimina de la pila
git stash apply stash@{1}        # recupera uno específico sin eliminarlo
git stash drop stash@{0}         # eliminar uno
git stash clear                  # vaciar la pila
```

---

## 10. Etiquetas (tags)

Se usan para marcar versiones o entregas.

```bash
git tag                                        # listar etiquetas
git tag v1.0                                   # etiqueta liviana
git tag -a v1.0 -m "Primera entrega"           # etiqueta anotada (recomendada)
git tag -a v1.0 <hash>                         # etiquetar un commit pasado

git show v1.0                                  # ver detalle
git push origin v1.0                           # subir una etiqueta
git push --tags                                # subir todas
git tag -d v1.0                                # borrar local
git push origin --delete v1.0                  # borrar remota
```

---

## 11. Ignorar archivos

Se crea un archivo `.gitignore` en la raíz del proyecto:

```gitignore
# Dependencias
node_modules/

# Variables de entorno (¡nunca subir credenciales!)
.env
.env.local

# Compilados
*.class
target/
dist/
build/

# IDE
.vscode/
.idea/
*.iml

# Sistema operativo
Thumbs.db
.DS_Store

# Logs
*.log
npm-debug.log*
```

Si un archivo ya fue commiteado, agregarlo al `.gitignore` no alcanza:

```bash
git rm --cached <archivo>        # deja de rastrearlo pero no lo borra del disco
git rm -r --cached <carpeta>     # lo mismo para carpetas
```

---

## 12. Flujo de trabajo típico con ramas

Secuencia completa para desarrollar una funcionalidad:

```bash
# 1. Partir de main actualizado
git switch main
git pull

# 2. Crear la rama de la funcionalidad
git switch -c feature/login

# 3. Trabajar y commitear (varias veces)
git add .
git commit -m "feat: agrega formulario de login"

# 4. Subir la rama por primera vez
git push -u origin feature/login

# 5. Antes de integrar, traer lo nuevo de main
git switch main
git pull
git switch feature/login
git merge main                   # resolver conflictos acá, no en main

# 6. Integrar
git switch main
git merge feature/login
git push

# 7. Limpiar
git branch -d feature/login
git push origin --delete feature/login
```

---

## 13. Resolver conflictos

Cuando dos ramas modifican la misma línea, Git no decide por vos:

```
<<<<<<< HEAD
código de la rama actual
=======
código de la rama que estás fusionando
>>>>>>> feature/login
```

Procedimiento:

1. `git status` te lista los archivos en conflicto.
2. Abrí cada archivo y editá: borrá los marcadores `<<<<<<<`, `=======`, `>>>>>>>`
   y dejá el código como debe quedar.
3. `git add <archivo>` para marcarlo como resuelto.
4. `git commit` para cerrar el merge.

```bash
git merge --abort                # si preferís cancelar todo y volver atrás
git diff --name-only --diff-filter=U    # listar solo los archivos en conflicto
```

---

## 14. Convención de mensajes de commit

*Conventional Commits* — estándar muy difundido en la industria:

```
<tipo>: <descripción en imperativo y minúscula>
```

| Tipo | Uso |
|---|---|
| `feat` | nueva funcionalidad |
| `fix` | corrección de un error |
| `docs` | cambios en documentación |
| `style` | formato, espacios, punto y coma (sin cambio de lógica) |
| `refactor` | reestructuración sin cambiar comportamiento |
| `test` | agregar o corregir tests |
| `chore` | tareas de mantenimiento, dependencias, configuración |

```bash
git commit -m "feat: agrega validación de email en el registro"
git commit -m "fix: corrige cálculo del total en el carrito"
```

Un buen mensaje completa la frase: *"Si se aplica, este commit va a…"*

---

## 15. Comandos de rescate

```bash
git reflog                       # ver todo lo que hiciste (recuperar commits perdidos)
git fsck --lost-found            # buscar objetos huérfanos
git clean -n                     # previsualizar qué archivos sin rastrear se borrarían
git clean -fd                    # borrarlos de verdad (⚠️ irreversible)
git bisect start                 # búsqueda binaria del commit que introdujo un bug
git cherry-pick <hash>           # traer un commit puntual de otra rama
git gc                           # optimizar el repositorio
```

---

## 16. Autenticación con GitHub

GitHub **no acepta la contraseña de tu cuenta** desde la terminal desde 2021.

| Método | Cómo |
|---|---|
| **Credential Manager** | Viene con Git for Windows. Se activa solo en el primer `push`. |
| **GitHub CLI** | `gh auth login` → autenticar por navegador |
| **SSH** | `ssh-keygen -t ed25519 -C "tu@email.com"` → pegar `~/.ssh/id_ed25519.pub` en Settings → SSH keys |
| **Token (PAT)** | Settings → Developer settings → Personal access tokens. Se usa en lugar de la contraseña. |

Verificar SSH:

```bash
ssh -T git@github.com
```

---

## 17. Advertencias

- **No guardes repos dentro de OneDrive, Google Drive o Dropbox.** Sincronizan la
  carpeta `.git` mientras Git la escribe y pueden corromper el repositorio.
- **Nunca commitees credenciales**, tokens ni archivos `.env`. Una vez en la historia,
  siguen ahí aunque los borres después.
- **No hagas `rebase` ni `push --force`** sobre ramas compartidas.
- **Antes de un `reset --hard`**, verificá con `git status` que no haya trabajo sin guardar.

---

## Ayuda integrada

```bash
git help <comando>               # manual completo
git <comando> -h                 # resumen rápido de opciones
```
