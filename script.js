let allExtensions = [];

function renderExtensions(extensions) {
  const list = document.getElementById('extensions-list');
  list.innerHTML = extensions.map(ext => `
    <li class="extension">
      <div style="display: flex; align-items: center; gap: 14px;">
        <img src="${ext.logo}" alt="Extension Icon" style="width: 40px; height: 40px;">
        <div>
          <h2 style="font-size: 1.2rem; font-weight: 600; margin: 0;">${ext.name}</h2>
          <p style="color: #b8c1ec; margin: 4px 0 0 0;">${ext.description}</p>
        </div>
      </div>
      <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 18px;">
        <button class="remove-btn" data-name="${ext.name}">Remove</button>
        <label class="switch">
          <input type="checkbox" ${ext.isActive ? 'checked' : ''} data-name="${ext.name}">
          <span class="slider"></span>
        </label>
      </div>
    </li>
  `).join('');

  // Attach events after rendering
  document.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const name = btn.dataset.name;
      allExtensions = allExtensions.filter(e => e.name !== name);
      renderExtensions(allExtensions);
    });
  });

  document.querySelectorAll('input[type="checkbox"]').forEach(switchBox => {
    switchBox.addEventListener('change', () => {
      const name = switchBox.dataset.name;
      const ext = allExtensions.find(e => e.name === name);
      ext.isActive = switchBox.checked;
    });
  });
}

// Fetch JSON
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    allExtensions = data;
    renderExtensions(allExtensions);
  });

// Filter button handlers
document.querySelectorAll('.filters button').forEach(button => {
  button.addEventListener('click', () => {
    // Remove active class from all buttons
    document.querySelectorAll('.filters button').forEach(btn =>
      btn.classList.remove('active')
    );

    // Add active class to clicked button
    button.classList.add('active');

    // Apply filter logic
    const filter = button.textContent.toLowerCase();
    let filtered;

    if (filter === 'active') {
      filtered = allExtensions.filter(ext => ext.isActive);
    } else if (filter === 'inactive') {
      filtered = allExtensions.filter(ext => !ext.isActive);
    } else {
      filtered = allExtensions;
    }

    renderExtensions(filtered);
  });
});

  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  const themeIcon = themeToggle.querySelector('img');

  // Load theme from localStorage (if available)
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    body.classList.add('light');
    themeIcon.src = '/assets/images/icon-moon.svg';
  }

  themeToggle.addEventListener('click', () => {
    const isLight = body.classList.toggle('light');

    // Change icon
    themeIcon.src = isLight
      ? '/assets/images/icon-moon.svg'
      : '/assets/images/icon-sun.svg';

    // Save preference
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });