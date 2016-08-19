function uniquify(s) {
    var chrome_like = (m, p, o, s) => {
        if (m == '')
            return ' (1)';
        else
            return '('+(parseInt(p)+1)+')';
    };
    return s.replace(/\((\d+)\)|$/, chrome_like);
}
