jQuery(document).ready(function ($) {

	/*======= Load shared navigation *=======*/
	const navSlot = document.getElementById('nav-slot');
	if (navSlot) {
		// Use relative path so it works on GitHub Pages under any base URL
		fetch('nav.html')
			.then((response) => response.text())
			.then((html) => {
				navSlot.innerHTML = html;
				const current = window.location.pathname.split('/').pop() || 'index.html';
				navSlot.querySelectorAll('[data-page]').forEach((link) => {
					const target = link.getAttribute('data-page');
					if (current === target || (current === '' && target === 'index.html')) {
						link.classList.add('active');
					}
				});
			})
			.catch(() => {
				navSlot.innerHTML = '<nav class="nav"><div class="navLayout container">Navigation unavailable</div></nav>';
			});
	}

	/*======= Animate Skillset *=======*/
	$('.level-bar-inner').css('width', '0');
	$(window).on('load', function () {
		$('.level-bar-inner').each(function () {
			var itemWidth = $(this).data('level');
			$(this).animate({
				width: itemWidth
			}, 800);

		});
		/* Bootstrap Tooltip for Skillset */
		$('.level-label').tooltip();

		/*======= Populate GitHub Projects *=======*/
		const gitHubUsername = 'namratak277';

		requestUserRepos(gitHubUsername)
			.then(response => response.json())
			.then(data => {
				if (!Array.isArray(data)) {
					throw new Error('Invalid GitHub API response');
				}

				const repos = data.filter(repo => !repo.fork);
				renderProjectFeed(repos);
				renderGitHubGallery(repos);
			})
			.catch(() => {
				setLoadError('project-feed');
				setLoadError('github-gallery');
			});
	});

	function renderProjectFeed(repos) {
		const projectFeed = document.getElementById('project-feed');
		if (!projectFeed) {
			return;
		}

		projectFeed.innerHTML = '<p class="text-muted">Loading latest repositories...</p>';
		const projectList = repos.slice(0, 4);
		projectFeed.innerHTML = '';

		projectList.forEach(repo => {
			const item = document.createElement('div');
			item.classList.add('mb-3');

			const languages = buildLanguageList(repo);

			item.innerHTML = `
				<div class="d-flex align-items-start justify-content-between">
					<h4 class="mb-1">${repo.name}</h4>
					<a href="${repo.html_url}" class="icon-link" aria-label="GitHub link" target="_blank" rel="noreferrer"><i class="fa fa-github"></i></a>
				</div>
				<p class="mb-1">${repo.description || 'No description yet.'}</p>
				<p class="meta mb-2">Updated ${new Date(repo.updated_at).toLocaleDateString()}</p>
			`;

			item.appendChild(languages);
			projectFeed.appendChild(item);
		});
	}

	function renderGitHubGallery(repos) {
		const gallery = document.getElementById('github-gallery');
		if (!gallery) {
			return;
		}

		gallery.innerHTML = '<p class="text-muted">Loading repositories...</p>';
		const galleryRepos = repos.slice(0, 8);
		gallery.innerHTML = '';

		galleryRepos.forEach(repo => {
			const card = document.createElement('article');
			card.classList.add('repo-card');

			const languageList = buildLanguageList(repo);
			languageList.classList.add('repo-languages');

			card.innerHTML = `
				<h3 class="repo-title">
					<a href="${repo.html_url}" target="_blank" rel="noreferrer">${repo.name}</a>
				</h3>
				<p class="repo-description">${repo.description || 'No description yet.'}</p>
				<p class="repo-meta">Updated ${new Date(repo.updated_at).toLocaleDateString()}</p>
			`;

			card.appendChild(languageList);
			gallery.appendChild(card);
		});
	}

	function buildLanguageList(repo) {
		const languages = document.createElement('ul');
		languages.classList.add('list-unstyled', 'd-flex', 'flex-wrap', 'gap-2', 'mb-2');

		requestRepoLanguages(repo.languages_url)
			.then(response => response.json())
			.then(langData => {
				Object.keys(langData).slice(0, 4).forEach(lang => {
					const langItem = document.createElement('li');
					langItem.classList.add('pill');
					langItem.textContent = lang;
					languages.appendChild(langItem);
				});

				if (!languages.children.length) {
					const langItem = document.createElement('li');
					langItem.classList.add('pill');
					langItem.textContent = 'No language data';
					languages.appendChild(langItem);
				}
			})
			.catch(() => {
				const langItem = document.createElement('li');
				langItem.classList.add('pill');
				langItem.textContent = 'Language unavailable';
				languages.appendChild(langItem);
			});

		return languages;
	}

	function setLoadError(elementId) {
		const element = document.getElementById(elementId);
		if (!element) {
			return;
		}

		element.innerHTML = '<p class="text-danger">Could not load GitHub repositories right now.</p>';
	}


	function requestUserRepos(username) {
		return Promise.resolve(fetch(`https://api.github.com/users/${username}/repos?sort=updated`));
	}


	function requestRepoLanguages(url) {
		return Promise.resolve(fetch(`${url}`));
	}
});
