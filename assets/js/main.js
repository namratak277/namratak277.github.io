jQuery(document).ready(function ($) {

	/*======= Load shared navigation *=======*/
	const navSlot = document.getElementById('nav-slot');
	if (navSlot) {
		fetch('/nav.html')
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
				navSlot.innerHTML = '<nav class="site-nav"><div class="site-nav__inner container">Navigation unavailable</div></nav>';
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
		const projectFeed = document.getElementById('project-feed');
		if (!projectFeed) {
			return;
		}

		projectFeed.innerHTML = '<p class="text-muted">Loading latest repositories...</p>';

		requestUserRepos(gitHubUsername)
			.then(response => response.json())
			.then(data => {
				const projectList = data.slice(0, 4);
				projectFeed.innerHTML = '';

				projectList.forEach(repo => {
					const item = document.createElement('div');
					item.classList.add('mb-3');

					const languages = document.createElement('ul');
					languages.classList.add('list-unstyled', 'd-flex', 'flex-wrap', 'gap-2', 'mb-2');

					requestRepoLanguages(repo.languages_url)
						.then(response => response.json())
						.then(langData => {
							Object.keys(langData).forEach(lang => {
								const langItem = document.createElement('li');
								langItem.classList.add('pill');
								langItem.textContent = lang;
								languages.appendChild(langItem);
							});
						});

					item.innerHTML = `
						<div class="d-flex align-items-start justify-content-between">
							<h4 class="mb-1">${repo.name}</h4>
							<a href="${repo.html_url}" class="icon-link" aria-label="GitHub link"><i class="fa fa-github"></i></a>
						</div>
						<p class="mb-1">${repo.description || 'No description yet.'}</p>
						<p class="meta mb-2">Updated ${new Date(repo.updated_at).toLocaleDateString()}</p>
					`;

					item.appendChild(languages);
					projectFeed.appendChild(item);
				});
			})
			.catch(() => {
				projectFeed.innerHTML = '<p class="text-danger">Could not load GitHub projects right now.</p>';
			});
	});


	function requestUserRepos(username) {
		// create a variable to hold the `Promise` returned from `fetch`
		return Promise.resolve(fetch(`https://api.github.com/users/${username}/repos?sort=created`));
	}


	function requestRepoLanguages(url) {
		// create a variable to hold the `Promise` returned from `fetch`
		return Promise.resolve(fetch(`${url}`));
	}
});
