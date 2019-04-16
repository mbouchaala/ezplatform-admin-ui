(function(global, doc, eZ) {
    const udwContainer = doc.getElementById('react-udw');
    const limitationsRadio = doc.querySelectorAll('.ez-limitations__radio');
    const token = doc.querySelector('meta[name="CSRF-Token"]').content;
    const siteaccess = doc.querySelector('meta[name="SiteAccess"]').content;
    const closeUDW = () => ReactDOM.unmountComponentAtNode(udwContainer);
    const selectSubtreeConfirm = (data) => {
        const selectedItems = data.reduce((total, item) => `${total}<li>${item.ContentInfo.Content.Name}</li>`, '');

        doc.querySelector('#role_assignment_create_locations').value = data.map((item) => item.id).join();
        doc.querySelector('.ez-limitations__selected-subtree').innerHTML = selectedItems;

        closeUDW();
    };
    const selectSubtree = (event) => {
        event.preventDefault();

        const config = JSON.parse(event.currentTarget.dataset.udwConfig);

        ReactDOM.render(
            React.createElement(
                eZ.modules.UniversalDiscovery,
                Object.assign(
                    {
                        onConfirm: selectSubtreeConfirm.bind(this),
                        onCancel: closeUDW,
                        multiple: true,
                        startingLocationId: eZ.adminUiConfig.universalDiscoveryWidget.startingLocationId,
                        restInfo: { token, siteaccess },
                    },
                    config
                )
            ),
            udwContainer
        );
    };
    const toggleDisabledState = () => {
        limitationsRadio.forEach((radio) => {
            const disableNode = doc.querySelector(radio.dataset.disableSelector);
            const methodName = radio.checked ? 'removeAttribute' : 'setAttribute';

            if (disableNode) {
                disableNode[methodName]('disabled', 'disabled');
            }
        });
    };

    doc.querySelector('.ez-btn--select-subtree').addEventListener('click', selectSubtree, false);
    limitationsRadio.forEach((radio) => radio.addEventListener('change', toggleDisabledState, false));
})(window, document, window.eZ);
