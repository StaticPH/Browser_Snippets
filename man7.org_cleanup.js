// for Section 1 manpages on man7.org
// https://man7.org/linux/man-pages/dir_section_1.html

/* prototype:
toRemove=['[href^="./man1/stg-"]', '[href^="./man1/dpkg"]', '[href^="./man1/mysql"]', '[href^="./man1/dh_"]','[href^="./man1/lxc-"]', '[href^="./man1/lttng"]', '[href^="./man1/yum"]', '[href^="./man1/git"]', '[href^="./man1/wsrep"]', '[href^="./man1/perf-"]', '[href^="./man1/trace-"]', '[href^="./man1/pcp"]', '[href^="./man1/systemd"]', '[href^="./man1/pmd"]', '[href^="./man1/pmc"]', '[href^="./man1/ppd"]', '[href^="./man1/psf"]', '[href^="./man1/pmlog"]', '[href^="./man1/rdma_"]', '[href^="./man1/ldap"]', '[href^="./man1/ibv"]', '[href^="./man1/aria_"]', '[href^="./man1/msg"]'];
document.querySelectorAll(toRemove).forEach(function(e){nxt=e.nextElementSibling; nxt && nxt.tagName=="BR" && nxt.remove(); e.remove(); });
*/

selectorOpen = '[href^="';
selectorClose = '"]';
sectionPrefix = './man1/';
function combine(namePrefix) {
	return selectorOpen + sectionPrefix + namePrefix + selectorClose;
}

toRemove = ['stg-', 'dpkg', 'mysql', 'dh_', 'lxc-', 'lttng', 'yum', 'git', 'wsrep', 'perf-', 'trace-', 'pcp', 'systemd', 'pmd', 'pmc', 'ppd', 'psf', 'pmlog', 'rdma_', 'ldap', 'ibv', 'aria_'];
for (let i = 0, len = toRemove.length; i < len; i++) {
	toRemove[i] = combine(toRemove[i]);
}

document.querySelectorAll(toRemove).forEach(function(e) {
	let nxt = e.nextElementSibling;
	nxt && nxt.tagName == "BR" && nxt.remove();
	e.remove();
});

// '^="xz', '^="y4', '^="zsys', '^="zulu', '^="zsh', '^="4s-', '^="bp_', '^="razor-', '^="sqlt-', '^="stag-', '^="sreview', '^="po4', '^="pod2', '^="cpan', '^="r3.', '^="r.', '^="d.', '^="db', '^="t.', '^="tax', '^="tradis', '^="tv_', '^="ecaccess', '^="wiki-', '^="gmod_', '^="paho_c', '^="pan_genome', '^="PDL::', '^="perl', '*="X11', '*="wayland', '*="wxGUI', '*="postgres', '*="elixir', '*="mail', '*="latex', '*="munin', '*="mysql', '*="php', '$="1ssl.gz', '$="1NCARG.gz', '$="1NCAR.gz', '$="1grass.gz', '$="1mh.gz', '$="1rheolef.gz', '$="1PVM.gz', '$="1x.gz',

/*
removeme=['pm', 'valgrind', 'callgrind', 'babel', 'sha', 'base', 'ssh', 'ncurse', 'new', 'msg', 'mk', 'ch', 'roff', 'gro', 'q', 'abi', 'nfs', 'stap', 'ge', 'ov', 'pdf', 'uu', 'v', 'y', 'z', 'x', 'cups', 'blk'];
for (let i = 0, len = removeme.length; i < len; i++) {
	removeme[i] = combine(removeme[i]);
}
document.querySelectorAll(removeme).forEach(function(e) {
	let nxt = e.nextElementSibling;
	nxt && nxt.tagName == "BR" && nxt.remove();
	e.remove();
});
*/
