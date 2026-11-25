
        // ---- Demo Data (in-memory) ----
        const state = {
            books: [
                    { id: 1, title: 'The Pragmatic Programmer', author: 'Andrew Hunt', category: 'Technology', isbn: '978-0201616224', cover: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?q=80&w=800&auto=format&fit=crop' },
                    { id: 1, title: 'The Pragmatic Programmer', author: 'Andrew Hunt', category: 'Technology', isbn: '978-0201616224', cover: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?q=80&w=800&auto=format&fit=crop' },
                    { id: 2, title: 'A Brief History of Time', author: 'Stephen Hawking', category: 'Science', isbn: '978-0553380163', cover: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=800&auto=format&fit=crop' },
                    { id: 2, title: 'A Brief History of Time', author: 'Stephen Hawking', category: 'Science', isbn: '978-0553380163', cover: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=800&auto=format&fit=crop' },
                    { id: 3, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', category: 'Fiction', isbn: '978-0743273565', cover: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800&auto=format&fit=crop' },
                    { id: 3, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', category: 'Fiction', isbn: '978-0743273565', cover: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800&auto=format&fit=crop' },
                    { id: 4, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', category: 'Fiction', isbn: '978-0743273565', cover: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800&auto=format&fit=crop' },
                    { id: 4, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', category: 'Fiction', isbn: '978-0743273565', cover: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800&auto=format&fit=crop' },
                    
                    
                    
                
            ],
            members: [
                { id: 1, name: 'Aarav Singh', email: 'aarav@example.com', phone: '+91-98765 43210', joined: '2024-01-15' },
                { id: 2, name: 'Priya Sharma', email: 'priya@example.com', phone: '+91-98765 11111', joined: '2024-03-08' },
                { id: 3, name: 'Rohan Gupta', email: 'rohan@example.com', phone: '+91-91234 56789', joined: '2025-02-11' },
            ],
            loans: [
                { id: 1, bookId: 1, memberId: 2, issued: '2025-08-20', due: '2025-09-05', returned: null },
                { id: 2, bookId: 3, memberId: 1, issued: '2025-08-25', due: '2025-09-10', returned: null },
            ],
            nextIds: { book: 5, member: 4, loan: 3 }
        };

        // ---- Helpers ----
        const $ = sel => document.querySelector(sel);
        const $$ = sel => Array.from(document.querySelectorAll(sel));
        const toastEl = new bootstrap.Toast(document.getElementById('toast'));
        function toast(msg) { document.getElementById('toastBody').textContent = msg; toastEl.show(); }
        function fmtDate(d) { return new Date(d).toLocaleDateString(); }

        // ---- Renderers ----
        function renderStats() {
            document.getElementById('statBooks').textContent = state.books.length;
            document.getElementById('statMembers').textContent = state.members.length;
            const onLoan = state.loans.filter(l => !l.returned).length;
            const overdue = state.loans.filter(l => !l.returned && new Date(l.due) < new Date()).length;
            document.getElementById('statOnLoan').textContent = onLoan;
            document.getElementById('statOverdue').textContent = overdue;
        }

        function renderBooks(list = state.books) {
            const grid = document.getElementById('booksGrid');
            grid.innerHTML = '';
            if (!list.length) { document.getElementById('booksEmpty').style.display = 'block'; return; }
            document.getElementById('booksEmpty').style.display = 'none';
            list.forEach(b => {
                const col = document.createElement('div');
                col.className = 'col-6 col-md-4 col-lg-3';
                col.innerHTML = `
          <div class="card h-100 card-hover shadow-sm">
            <img class="book-cover w-100" src="${b.cover || 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=800&auto=format&fit=crop'}" alt="${b.title}">
            <div class="card-body">
              <h6 class="card-title mb-1 text-truncate" title="${b.title}">${b.title}</h6>
              <div class="small text-secondary text-truncate" title="${b.author}"><i class="bi bi-person me-1"></i>${b.author}</div>
              <div class="d-flex justify-content-between align-items-center mt-2">
                <span class="chip">${b.category}</span>
                <div class="btn-group">
                  <button class="btn btn-sm btn-outline-secondary" title="Details" onclick='showBook(${b.id})'><i class="bi bi-eye"></i></button>
                  <button class="btn btn-sm btn-outline-primary" title="Issue" onclick='prefillIssue(${b.id})' data-bs-toggle="modal" data-bs-target="#modalIssue"><i class="bi bi-box-arrow-up-right"></i></button>
                </div>
              </div>
            </div>
          </div>`;
                grid.appendChild(col);
            });
        }

        function renderMembers() {
            const term = document.getElementById('memberSearch').value.toLowerCase();
            const tbody = document.getElementById('membersTbody');
            tbody.innerHTML = '';
            state.members
                .filter(m => (m.name + m.email + m.phone).toLowerCase().includes(term))
                .forEach((m, i) => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
            <td>${i + 1}</td>
            <td>${m.name}</td>
            <td>${m.email || '-'}</td>
            <td>${m.phone || '-'}</td>
            <td>${fmtDate(m.joined)}</td>
            <td class="text-end">
              <button class="btn btn-sm btn-outline-secondary" onclick='prefillIssue(null, ${m.id})' data-bs-toggle="modal" data-bs-target="#modalIssue"><i class="bi bi-box-arrow-up-right"></i></button>
              <button class="btn btn-sm btn-outline-danger" onclick='deleteMember(${m.id})'><i class="bi bi-trash"></i></button>
            </td>`;
                    tbody.appendChild(tr);
                });
        }

        function renderLoans() {
            const term = document.getElementById('loanSearch').value.toLowerCase();
            const tbody = document.getElementById('loansTbody');
            tbody.innerHTML = '';
            const rows = state.loans.map((l, i) => {
                const b = state.books.find(b => b.id === l.bookId) || { title: '[Deleted]' };
                const m = state.members.find(m => m.id === l.memberId) || { name: '[Deleted]' };
                const overdue = !l.returned && new Date(l.due) < new Date();
                return { i, l, b, m, overdue };
            }).filter(r => (r.b.title + r.m.name).toLowerCase().includes(term));

            rows.forEach((r, idx) => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
          <td>${idx + 1}</td>
          <td>${r.b.title}</td>
          <td>${r.m.name}</td>
          <td>${fmtDate(r.l.issued)}</td>
          <td>${fmtDate(r.l.due)}</td>
          <td>
            <span class="badge ${r.l.returned ? 'text-bg-success' : r.overdue ? 'text-bg-danger' : 'text-bg-warning'}">
              ${r.l.returned ? 'Returned' : r.overdue ? 'Overdue' : 'On loan'}
            </span>
          </td>
          <td class="text-end">
            ${r.l.returned ? '' : `<button class='btn btn-sm btn-outline-success' onclick='prefillReturn(${r.l.id})' data-bs-toggle="modal" data-bs-target="#modalReturn"><i class="bi bi-check2"></i> Return</button>`}
          </td>`;
                tbody.appendChild(tr);
            });

            // Update return modal select
            const sel = document.getElementById('formReturnLoan');
            sel.innerHTML = rows.filter(r => !r.l.returned).map(r => `<option value="${r.l.id}">${r.b.title} → ${r.m.name}</option>`).join('');
        }

        // ---- Filters ----
        function filterBooks() {
            const term = (document.getElementById('bookSearch').value || document.getElementById('globalSearch').value || '').toLowerCase();
            const cat = document.getElementById('bookCategory').value;
            const list = state.books.filter(b => {
                const inTerm = (b.title + b.author + b.isbn).toLowerCase().includes(term);
                const inCat = !cat || b.category === cat;
                return inTerm && inCat;
            });
            renderBooks(list);
        }

        // ---- CRUD-ish operations (demo only) ----
        function addBookFromForm() {
            const title = document.getElementById('formTitle').value.trim();
            const isbn = document.getElementById('formIsbn').value.trim();
            const author = document.getElementById('formAuthor').value.trim();
            const category = document.getElementById('formCategory').value;
            const cover = document.getElementById('formCover').value.trim();
            if (!title || !author) return;
            state.books.push({ id: state.nextIds.book++, title, isbn, author, category, cover });
            toast('Book added');
            filterBooks();
            refreshIssueSelects();
            renderStats();
        }

        function addMemberFromForm() {
            const name = document.getElementById('formMName').value.trim();
            const phone = document.getElementById('formMPhone').value.trim();
            const email = document.getElementById('formMEmail').value.trim();
            if (!name) return;
            state.members.push({ id: state.nextIds.member++, name, phone, email, joined: new Date().toISOString().slice(0, 10) });
            toast('Member added');
            renderMembers();
            refreshIssueSelects();
            renderStats();
        }

        function deleteMember(id) {
            state.members = state.members.filter(m => m.id !== id);
            toast('Member removed');
            renderMembers();
            refreshIssueSelects();
            renderStats();
        }

        function issueBookFromForm() {
            const bookId = +document.getElementById('formIssueBook').value;
            const memberId = +document.getElementById('formIssueMember').value;
            const issued = document.getElementById('formIssueDate').value || new Date().toISOString().slice(0, 10);
            const due = document.getElementById('formDueDate').value || new Date(Date.now() + 12096e5).toISOString().slice(0, 10); // +14d
            if (!bookId || !memberId) return;
            state.loans.push({ id: state.nextIds.loan++, bookId, memberId, issued, due, returned: null });
            toast('Book issued');
            renderLoans();
            renderStats();
        }

        function prefillIssue(bookId = null, memberId = null) {
            const bookSel = document.getElementById('formIssueBook');
            const memberSel = document.getElementById('formIssueMember');
            bookSel.value = bookId || ''; memberSel.value = memberId || '';
        }

        function returnBookFromForm() {
            const loanId = +document.getElementById('formReturnLoan').value;
            const date = document.getElementById('formReturnDate').value || new Date().toISOString().slice(0, 10);
            const loan = state.loans.find(l => l.id === loanId);
            if (loan) { loan.returned = date; toast('Book returned'); }
            renderLoans();
            renderStats();
        }

        function prefillReturn(loanId) {
            document.getElementById('formReturnLoan').value = loanId;
            document.getElementById('formReturnDate').valueAsDate = new Date();
        }

        function showBook(id) {
            const b = state.books.find(x => x.id === id);
            if (!b) return;
            alert(`${b.title}\nAuthor: ${b.author}\nCategory: ${b.category}\nISBN: ${b.isbn || '-'}`);
        }

        function refreshIssueSelects() {
            const bookSel = document.getElementById('formIssueBook');
            const memberSel = document.getElementById('formIssueMember');
            bookSel.innerHTML = state.books.map(b => `<option value="${b.id}">${b.title}</option>`).join('');
            memberSel.innerHTML = state.members.map(m => `<option value="${m.id}">${m.name}</option>`).join('');
        }

        // ---- Init ----
        function init() {
            document.getElementById('year').textContent = new Date().getFullYear();
            renderBooks();
            renderMembers();
            renderLoans();
            refreshIssueSelects();
            renderStats();
        }
        init();
    